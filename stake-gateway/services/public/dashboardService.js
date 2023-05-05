const { CashAccount, TradingCallType } = require("../../common/constants");
const TradingCall = require("../../models/TradingCall")

const getTradeStats = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let tradingCalls = await TradingCall.find({
        userId: userId,
        cashAccount: CashAccount.REAL,
        masterPaid: true,
    });
    let totalWinRound = tradingCalls.filter(e => e.type == e.winType).length;
    let totalLoseRound = tradingCalls.filter(e => e.type != e.winType).length;
    let totalRound = tradingCalls.length;
    let winrate = totalWinRound / totalRound;
    let totalAmount = tradingCalls.reduce((partialSum, e) => partialSum + e.betCash, 0);
    let loseAmount = tradingCalls.filter(e => e.type != e.winType).reduce((partialSum, e) => partialSum + e.betCash, 0);
    let winAmount = tradingCalls.filter(e => e.type == e.winType).reduce((partialSum, e) => partialSum + e.betCash, 0);
    let netProfit = winAmount - loseAmount;
    let totalRevenue = winAmount;
    let sellCount = tradingCalls.filter(e => e.type == TradingCallType.SELL).length;
    let buyCount = tradingCalls.filter(e => e.type == TradingCallType.BUY).length;
    res.json({
        'tradeStats': {
            totalWinRound: totalWinRound,
            totalLoseRound: totalLoseRound,
            totalRound: totalRound,
            winrate: winrate,
            totalAmount: totalAmount
        },
        tradeSummary: {
            netProfit: netProfit,
            totalRevenue: totalRevenue,
            sellCount: sellCount,
            buyCount: buyCount,
        }
    });
}

module.exports = {
    getTradeStats: getTradeStats,
}