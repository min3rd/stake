const badRequestError = require("../../../common/badRequestError");
const { Status } = require("../../../common/constants");
const ErrorCode = require("../../../common/errorCode");
const logger = require("../../../common/logger");
const { publicMongoose } = require("../../../config/publicMongoose");
const { SocketEvent } = require("../../../config/socket.config");
const engine = require("../../../engine");
const { User } = require("../../../models/User");
const WithdrawOrder = require("../../../models/wallet/WithdrawOrder");
const notificationService = require("../../public/notificationService");

const searchWithdrawOrder = async function (req, res, next) {
    let startDate = new Date(req.query.startDate) || new Date();
    let endDate = new Date(req.query.endDate) || new Date();
    let withdrawOrders = await WithdrawOrder.find({
        time: {
            $gte: startDate,
            $lte: endDate,
        }
    }).sort({ time: -1 });
    res.json(withdrawOrders);
}

const getWithdrawOrderById = async function (req, res, next) {
    let withdrawOrder = await WithdrawOrder.findById(req.params.withdrawOrderId);
    res.json(withdrawOrder);
}

const acceptWithdrawOrder = async function (req, res, next) {
    let withdrawOrderId = req.params.withdrawOrderId;
    let transactionId = req.body.transactionId;
    const session = await publicMongoose.startSession();
    try {
        await session.startTransaction();
        let withdrawOrder = await WithdrawOrder.findById(req.params.withdrawOrderId);
        if (!withdrawOrder) {
            logger.error('admin_withdrawOrderService_acceptWithdrawOrder', `could not find withdrawOrderId=${withdrawOrderId}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
        }
        let amount = withdrawOrder.amount;
        let user = await User.findById(withdrawOrder.userId);
        if (user.cash < amount) {
            logger.error('admin_withdrawOrderService_acceptWithdrawOrder', `cash not enough user=${user}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
        }
        user.cash -= amount;
        user = await user.save();
        if (!user) {
            logger.error('admin_withdrawOrderService_acceptWithdrawOrder', `could not save user=${user}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDERCOULD_NOT_SAVE_USER));
        }
        withdrawOrder.transactionId = transactionId;
        withdrawOrder.status = Status.SUCCESS;
        withdrawOrder.updated = new Date();
        withdrawOrder = await withdrawOrder.save();
        if (!withdrawOrder) {
            logger.error('admin_withdrawOrderService_acceptWithdrawOrder', `could not save withdrawOrder=${withdrawOrder}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDERCOULD_NOT_SAVE_DEPOSIT_ORDER));
        }
        try {
            let notification = await notificationService.user_acceptWithdrawOrder(user._id, withdrawOrder);
            engine.publicIo.to(user._id).emit(SocketEvent.NOTIFICATION, notification);
        } catch (e) {
            logger.error('admin_withdrawOrderService_acceptWithdrawOrder', `could not create notification to user`);
        }
        await session.commitTransaction();
        await session.endSession();
        logger.info('admin_withdrawOrderService_acceptWithdrawOrder', `accepted withdrawOrder=${withdrawOrder}`);
        res.json(withdrawOrder);
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        logger.error('admin_withdrawOrderService_acceptWithdrawOrder', `could not accept withdrawOrderId=${withdrawOrderId} e=${e}`);
        next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDER_COULD_NOT_ACCEPT_DEPOSIT_ORDER));
    }

}

const denyWithdrawOrder = async function (req, res, next) {
    let withdrawOrderId = req.params.withdrawOrderId;
    const session = await publicMongoose.startSession();
    try {
        await session.startTransaction();
        let withdrawOrder = await WithdrawOrder.findById(req.params.withdrawOrderId);
        if (!withdrawOrder) {
            logger.error('admin_withdrawOrderService_denyWithdrawOrder', `could not find withdrawOrderId=${withdrawOrderId}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
        }
        withdrawOrder.status = Status.CANCELED;
        withdrawOrder.updated = new Date();
        withdrawOrder = await withdrawOrder.save();
        if (!withdrawOrder) {
            logger.error('admin_withdrawOrderService_denyWithdrawOrder', `could not save withdrawOrder=${withdrawOrder}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDERCOULD_NOT_SAVE_DEPOSIT_ORDER));
        }
        await session.commitTransaction();
        await session.endSession();
        logger.info('admin_withdrawOrderService_denyWithdrawOrder', `accepted withdrawOrder=${withdrawOrder}`);
        res.json(withdrawOrder);
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        logger.error('admin_withdrawOrderService_denyWithdrawOrder', `could not accept withdrawOrderId=${withdrawOrderId} e=${e}`);
        next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDER_COULD_NOT_ACCEPT_DEPOSIT_ORDER));
    }
}

module.exports = {
    searchWithdrawOrder: searchWithdrawOrder,
    acceptWithdrawOrder: acceptWithdrawOrder,
    denyWithdrawOrder: denyWithdrawOrder,
    getWithdrawOrderById: getWithdrawOrderById,
}