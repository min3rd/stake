const badRequestError = require("../../../common/badRequestError");
const binanceApi = require("../../../common/binanceApi");
const bscApi = require("../../../common/bscApi");
const ErrorCode = require("../../../common/errorCode");
const logger = require("../../../common/logger");
const { publicMongoose } = require("../../../config/publicMongoose");
const DepositOrder = require("../../../models/wallet/DepositOrder");
const engine = require("../../../engine");
const { SocketEvent } = require("../../../config/socket.config");
const AdminUser = require("../../../models/AdminUser");
const notificationService = require("../notificationService");
const AppConfig = require("../../../models/AppConfig");
const { Status } = require("../../../common/constants");
const { User } = require("../../../models/User");

const getDepositOrderById = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let depositOrder = await DepositOrder.findOne({
        userId: userId,
        _id: req.params.depositOrderId,
    });
    if (!depositOrder) {
        return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
    }
    res.json(depositOrder);
}

const getDepositOrders = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let depositOrders = await DepositOrder.find({
        userId: userId,
    }).sort(JSON.parse(req.query.sort) ?? { time: -1 }).skip(req.query.offset).limit(req.query.size);
    if (!depositOrders) {
        return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
    }
    res.json(depositOrders);
}

const deleteDepositOrder = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let depositOrder = await DepositOrder.findOne({
        userId: userId,
        _id: req.params.depositOrderId,
    });
    if (!depositOrder) {
        return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
    }
    depositOrder = await depositOrder.deleteOne();
    res.json(depositOrder);
}

const checkTransaction = async (req, res, next) => {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let transactionId = req.body.transactionId;
    if (!transactionId) {
        return next(badRequestError.make(ErrorCode.WALLET_TRANSACTION_COULD_NOT_BE_EMPTY));
    }
    const session = await publicMongoose.startSession();
    try {
        await session.startTransaction();
        let appConfig = await AppConfig.findOne({});
        const masterAddress = appConfig.MASTER_ADDRESS ?? process.env.MASTER_ADDRESS ?? '0x92b325Fa6e701f46EA66B262BBaC4E1596CDA2Cc';
        let depositOrder = await DepositOrder.findOne({
            transactionId: transactionId,
            status: {
                $in: [Status.PENDING, Status.SUCCESS],
            }
        });
        if (depositOrder) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.WALLET_TRANSACTION_EXISTS));
        }
        let user = await User.findById(userId);
        depositOrder = new DepositOrder({
            userId: userId,
            username: user.username,
            masterAddress: masterAddress,
            transactionId: transactionId,
            time: new Date(),
            status: Status.PENDING,
        });
        depositOrder = await depositOrder.save();
        if (!depositOrder) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.WALLET_COULD_NOT_DEPOSIT_ORDER));
        }
        await session.commitTransaction();
        await session.endSession();
        try {
            sendNotificationToAllAdmin(depositOrder);
            let notification = await notificationService.user_createDepositOrderNotification(user._id, depositOrder);
            engine.publicIo.to(user._id).emit(SocketEvent.NOTIFICATION, notification);
        } catch (e) {
            logger.error('depositService', `sendNotificationToAllAdmin e=${e}`);
        }
        res.json(depositOrder);
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        logger.error('depositService_createDepositOrder', `e=${e}`);
        return next(badRequestError.make(ErrorCode.WALLET_COULD_NOT_DEPOSIT_ORDER));
    }
}

async function sendNotificationToAllAdmin(depositOrder) {
    let admins = await AdminUser.find({});
    for (let admin of admins) {
        let noti = await notificationService.admin_createDepositOrderNotification(admin._id, depositOrder);
        engine.adminIo.to(admin._id).emit(SocketEvent.NOTIFICATION, noti);
    }
}

module.exports = {
    getDepositOrderById: getDepositOrderById,
    getDepositOrders: getDepositOrders,
    deleteDepositOrder: deleteDepositOrder,
    checkTransaction: checkTransaction,
};