const badRequestError = require("../common/badRequestError");
const ErrorCode = require("../common/errorCode");
const { User, PublicUser } = require("../models/User");

const switchAccount = async function (req, res) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return badRequestError.createError(res, ErrorCode.USERID_NOT_MATCH);
    }
    let user = await User.findById(userId);
    if (!user) {
        return badRequestError.createError(res, ErrorCode.USER_NOT_EXIST);
    }
    user.cashAccount = req.body.cashAccount;
    user = await user.save();
    res.send(new PublicUser(user));
}
const addDemoCash = async function (req, res) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return badRequestError.createError(res, ErrorCode.USERID_NOT_MATCH);
    }
    let user = await User.findById(userId);
    if (!user) {
        return badRequestError.createError(res, ErrorCode.USER_NOT_EXIST);
    }
    user.demoCash = user.demoCash + 10000 || 10000;
    user = await user.save();
    res.send(new PublicUser(user));
}
module.exports = {
    switchAccount: switchAccount,
    addDemoCash: addDemoCash,
}