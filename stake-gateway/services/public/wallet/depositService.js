const badRequestError = require("../../../common/badRequestError");
const ErrorCode = require("../../../common/errorCode");
const logger = require("../../../common/logger");
const { publicMongoose } = require("../../../config/publicMongoose");
const DepositOrder = require("../../../models/wallet/DepositOrder");
const DepositOrderStatus = {
    PENDING: 0,
    SUCCESS: 1,
    CANCELED: 2,
}
const createDepositOrder = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    const session = await publicMongoose.startSession();
    const masterAddress = process.env.MASTER_ADDRESS ?? '0x92b325Fa6e701f46EA66B262BBaC4E1596CDA2Cc';
    try {
        await session.startTransaction();
        let depositOrder = new DepositOrder({
            userId: userId,
            masterAddress: masterAddress,
            time: new Date(),
        });
        depositOrder = await depositOrder.save();
        if (!depositOrder) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.WALLET_COULD_NOT_DEPOSIT_ORDER));
        }
        await session.commitTransaction();
        await session.endSession();
        res.json(depositOrder);
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        logger.error('depositService_createDepositOrder', `e=${e}`);
        return next(badRequestError.make(ErrorCode.WALLET_COULD_NOT_DEPOSIT_ORDER));
    }
}

const getDepositOrderById = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let depositOrder = await DepositOrder.findById(req.params.depositOrderId);
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

const cancelDepositOrders = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let depositOrder = await DepositOrder.findById(req.params.depositOrderId);
    if (!depositOrder) {
        return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
    }
    depositOrder.flag = DepositOrderStatus.CANCELED;
    depositOrder = await depositOrder.save();
    res.json(depositOrder);
}

module.exports = {
    createDepositOrder: createDepositOrder,
    getDepositOrderById: getDepositOrderById,
    getDepositOrders: getDepositOrders,
    cancelDepositOrders: cancelDepositOrders,
};