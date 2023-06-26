const MonthlyProfit = require("../../../models/MonthlyProfit");
const moment = require('moment');

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
        _id: req.params.id,
    });
    res.json(monthlyProfit);
}

const saveMonthlyProfit = async function (req, res, next) {
    await MonthlyProfit.updateOne({ _id: req.params.id }, req.body);
    let monthlyProfit = await MonthlyProfit.findOne({
        _id: req.params.id,
    });
    res.json(monthlyProfit);
}

const createMonthlyProfit = async function (req, res, next) {
    let monthlyProfit = new MonthlyProfit();
    monthlyProfit = await monthlyProfit.save();
    res.json(monthlyProfit);
}

const deleteMonthlyProfit = async function (req, res, next) {
    let monthlyProfit = await MonthlyProfit.findOne({
        _id: req.params.id,
    });
    await monthlyProfit.deleteOne();
    res.json(monthlyProfit);
}

module.exports = {
    getMonthlyProfits: getMonthlyProfits,
    getMonthlyProfit: getMonthlyProfit,
    saveMonthlyProfit: saveMonthlyProfit,
    createMonthlyProfit: createMonthlyProfit,
    deleteMonthlyProfit: deleteMonthlyProfit,
}