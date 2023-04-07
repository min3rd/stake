const badRequestError = require("../common/badRequestError");
const ErrorCode = require("../common/errorCode");
const Notification = require("../models/Notification");
const { User, PublicUser } = require("../models/User");
const notificationService = require("./notificationService");

const switchAccount = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let user = await User.findById(userId);
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_EXIST));
    }
    user.cashAccount = req.body.cashAccount;
    user = await user.save();
    res.send(new PublicUser(user));
}
const addDemoCash = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let user = await User.findById(userId);
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_EXIST));
    }
    user.demoCash = user.demoCash + 10000 || 10000;
    user = await user.save();
    res.send(new PublicUser(user));
}
const getNotifications = async function (req, res, next) {
    try {
        if (!req.user) {
            return res.json([]);
        }
        const notifications = await Notification.find({
            userId: req.user.id
        }).sort({
            time: -1
        }).limit(20);
        return res.json(notifications);

    } catch (err) {
        next(err);
    }
};


const markAllNotificationAsRead = async function (req, res, next) {
    let notifications = await notificationService.markAllAsRead(req.user);
    res.json(notifications);
}

const removeNotification = async function (req, res, next) {
    let result = await notificationService.remove(req.user, req.body.id);
    res.json(result);
}

const updateNotification = async function (req, res, next) {
    res.json(await notificationService.update(req.user, req.body));
}
module.exports = {
    switchAccount: switchAccount,
    addDemoCash: addDemoCash,
    getNotifications: getNotifications,
    markAllNotificationAsRead: markAllNotificationAsRead,
    removeNotification: removeNotification,
    updateNotification: updateNotification,
}