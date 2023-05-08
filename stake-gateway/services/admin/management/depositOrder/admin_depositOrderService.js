const badRequestError = require("../../../../common/badRequestError");
const { Status } = require("../../../../common/constants");
const ErrorCode = require("../../../../common/errorCode");
const logger = require("../../../../common/logger");
const { publicMongoose } = require("../../../../config/publicMongoose");
const { User } = require("../../../../models/User");
const DepositOrder = require("../../../../models/wallet/DepositOrder");

const searchDepositOrders = async function (req, res, next) {
    let startDate = new Date(req.query.startDate) || new Date();
    let endDate = new Date(req.query.endDate) || new Date();
    let depositOrders = await DepositOrder.find({
        time: {
            $gte: startDate,
            $lte: endDate,
        }
    }).sort({ time: -1 });
    res.json(depositOrders);
}

const getDepositOrderById = async function (req, res, next) {
    let depositOrder = await DepositOrder.findById(req.params.depositOrderId);
    res.json(depositOrder);
}

const acceptDepositOrder = async function (req, res, next) {
    let depositOrderId = req.params.depositOrderId;
    let amount = parseFloat(req.body.amount);
    let userAddress = req.body.userAddress;
    const session = await publicMongoose.startSession();
    try {
        await session.startTransaction();
        let depositOrder = await DepositOrder.findById(req.params.depositOrderId);
        if (!depositOrder) {
            logger.error('admin_depositOrderService_acceptDepositOrder', `could not find depositOrderId=${depositOrderId}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
        }
        let user = await User.findById(depositOrder.userId);
        user.cash += amount;
        user = await user.save();
        if (!user) {
            logger.error('admin_depositOrderService_acceptDepositOrder', `could not save user=${user}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDERCOULD_NOT_SAVE_USER));
        }
        depositOrder.amount = amount;
        depositOrder.userAddress = userAddress;
        depositOrder.status = Status.SUCCESS;
        depositOrder = await depositOrder.save();
        if (!depositOrder) {
            logger.error('admin_depositOrderService_acceptDepositOrder', `could not save depositOrder=${depositOrder}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDERCOULD_NOT_SAVE_DEPOSIT_ORDER));
        }
        await session.commitTransaction();
        await session.endSession();
        logger.info('admin_depositOrderService_acceptDepositOrder', `accepted depositOrder=${depositOrder}`);
        res.json(depositOrder);
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        logger.info('admin_depositOrderService_acceptDepositOrder', `could not accept depositOrderId=${depositOrderId}`);
        next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDER_COULD_NOT_ACCEPT_DEPOSIT_ORDER));
    }

}

const denyDepositOrder = async function (req, res, next) {
    let depositOrderId = req.params.depositOrderId;
    const session = await publicMongoose.startSession();
    try {
        await session.startTransaction();
        let depositOrder = await DepositOrder.findById(req.params.depositOrderId);
        if (!depositOrder) {
            logger.error('admin_depositOrderService_denyDepositOrder', `could not find depositOrderId=${depositOrderId}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.WALLET_DEPOSIT_ORDER_NOT_FOUND));
        }
        depositOrder.status = Status.CANCELED;
        depositOrder = await depositOrder.save();
        if (!depositOrder) {
            logger.error('admin_depositOrderService_denyDepositOrder', `could not save depositOrder=${depositOrder}`);
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDERCOULD_NOT_SAVE_DEPOSIT_ORDER));
        }
        await session.commitTransaction();
        await session.endSession();
        logger.info('admin_depositOrderService_denyDepositOrder', `accepted depositOrder=${depositOrder}`);
        res.json(depositOrder);
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        logger.info('admin_depositOrderService_denyDepositOrder', `could not accept depositOrderId=${depositOrderId}`);
        next(badRequestError.make(ErrorCode.ADMIN_DEPOSIT_ORDER_COULD_NOT_ACCEPT_DEPOSIT_ORDER));
    }
}

module.exports = {
    searchDepositOrders: searchDepositOrders,
    acceptDepositOrder: acceptDepositOrder,
    denyDepositOrder: denyDepositOrder,
    getDepositOrderById: getDepositOrderById,
}