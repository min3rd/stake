const PartnerRegistration = require("../../../models/PartnerRegistration");

const getPartnerRegistrations = async function (req, res) {
    let partnerRegistrations = await PartnerRegistration.find({});
    res.json(partnerRegistrations);
}
const getPartnerRegistration = async function (req, res) {
    let partnerRegistration = await PartnerRegistration.findOne({
        _id: id,
    });
    res.json(partnerRegistration);
}

const savePartnerRegistration = async function (req, res) {
    await PartnerRegistration.updateOne({ _id: id }, req.body);
    let partnerRegistration = await PartnerRegistration.findOne({
        _id: id,
    });
    res.json(partnerRegistration);
}

module.exports = {
    getPartnerRegistrations,
    getPartnerRegistration,
    saveMonthlyProfit: savePartnerRegistration
}