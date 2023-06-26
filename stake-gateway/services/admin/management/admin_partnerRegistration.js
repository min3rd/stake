const PartnerRegistration = require("../../../models/PartnerRegistration");

const getPartnerRegistrations = async function (req, res, next) {
    let partnerRegistrations = await PartnerRegistration.find({});
    res.json(partnerRegistrations);
}
const getPartnerRegistration = async function (req, res, next) {
    let partnerRegistration = await PartnerRegistration.findOne({
        _id: req.params.id,
    });
    res.json(partnerRegistration);
}

const savePartnerRegistration = async function (req, res, next) {
    await PartnerRegistration.updateOne({ _id: req.params.id }, req.body);
    let partnerRegistration = await PartnerRegistration.findOne({
        _id: req.params.id,
    });
    res.json(partnerRegistration);
}

module.exports = {
    getPartnerRegistrations: getPartnerRegistrations,
    getPartnerRegistration: getPartnerRegistration,
    savePartnerRegistration: savePartnerRegistration
}