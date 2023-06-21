const { Status } = require("../../common/constants");
const PartnerRegistration = require("../../models/PartnerRegistration")

const getPartnerRegistrations = async function (req, res, next) {
    let partnerRegistrations = await PartnerRegistration.find({
        status: Status.SUCCESS,
    });
    res.json(partnerRegistrations);
}

module.exports = {
    getPartnerRegistrations: getPartnerRegistrations
}