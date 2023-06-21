const MonthlyProfit = require("../../../models/MonthlyProfit")

const getMonthlyProfits = async function (req, res, next) {
    let now = moment();
    let monthlyProfits = await MonthlyProfit.find({
        time: {
            $gte: now.clone().startOf('month'),
            $lte: now.clone().endOf('month'),
        }
    });
    res.json(monthlyProfits);
}
const getMonthlyProfit = async function (req, res, next) {
    let monthlyProfit = await MonthlyProfit.findOne({
        _id: id,
    });
    res.json(monthlyProfit);
}

const saveMonthlyProfit = async function (req, res, next) {
    await MonthlyProfit.updateOne({ _id: id }, req.body);
    let monthlyProfit = await MonthlyProfit.findOne({
        _id: id,
    });
    res.json(monthlyProfit);
}

module.exports = {
    getMonthlyProfits,
    getMonthlyProfit,
    saveMonthlyProfit
}