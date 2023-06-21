const badRequestError = require("../../common/badRequestError");
const { Status } = require("../../common/constants");
const ErrorCode = require("../../common/errorCode");
const AppConfig = require("../../models/AppConfig");
const Notification = require("../../models/Notification");
const PartnerRegistration = require("../../models/PartnerRegistration");
const { User, ClientUser } = require("../../models/User");
const { security } = require("../security");
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
    res.send(new ClientUser(user));
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
    res.send(new ClientUser(user));
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

const updateUser = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let checkUsername = await User.findOne({
        username: req.body.username,
    });
    if (checkUsername && checkUsername._id != userId) {
        return next(badRequestError.make(ErrorCode.USERNAME_EXISTS));
    }
    let user = await User.findById(userId);
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    user.name = req.body.name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.country = req.body.country;
    user.language = req.body.language;
    user = await user.save();
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    res.json(new ClientUser(user));
}

const changePassword = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let user = await User.findById(userId);
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    if (security.hashPassword(req.body.currentPassword) != user.password) {
        return next(badRequestError.make(ErrorCode.USER_PASSWORD_NOT_MATCH));
    }
    user.password = security.hashPassword(req.body.newPassword);
    user = await user.save();
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    res.json(new ClientUser(user));
}

const addWalletAddress = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let user = await User.findById(userId);
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    let address = req.body.address;
    if (!address) {
        return next(badRequestError.make(ErrorCode.WALLET_ADDRESS_NOT_EMPTY));
    }
    let exists = await User.findOne({
        wallets: {
            $in: [address]
        }
    });
    if (exists) {
        return next(badRequestError.make(ErrorCode.WALLET_ADDRESS_USED));
    }

    if (user.wallets.includes(address)) {
        return res.json(new ClientUser(user));
    }
    user.wallets.push(address);
    user = await user.save();
    res.json(new ClientUser(user));
}

const removeWalletAddress = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let user = await User.findById(userId);
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    let address = req.params.address;
    if (!address) {
        return next(badRequestError.make(ErrorCode.WALLET_ADDRESS_NOT_EMPTY));
    }
    if (!user.wallets.includes(address)) {
        return res.json(new ClientUser(user));
    }
    let index = user.wallets.indexOf(address);
    user.wallets.splice(index, 1);
    user = await user.save();
    res.json(new ClientUser(user));
}
const savePartnerRegistratrion = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let partnerRegistration = await PartnerRegistration.findOne({
        userId: userId,
    });
    let appConfig = await AppConfig.findOne({});
    let user = await User.findOne({
        _id: userId,
    });
    if (!user) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    if (appConfig.MIN_CASH_TO_REGISTER_PARTNER > user.cash) {
        return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
    }
    if (!partnerRegistration) {
        partnerRegistration = new PartnerRegistration({
            userId: userId,
            time: new Date(),
            phone: req.body.phone,
            email: req.body.email,
            telegram: req.body.telegram,
            zalo: req.body.zalo,
            facebook: req.body.facebook,
            address: req.body.address,
            status: Status.PENDING,
            username: user.username,
            name: user.name,
        });
    } else {
        partnerRegistration.phone = req.body.phone;
        partnerRegistration.email = req.body.email;
        partnerRegistration.telegram = req.body.telegram;
        partnerRegistration.zalo = req.body.zalo;
        partnerRegistration.facebook = req.body.facebook;
        partnerRegistration.address = req.body.address;
        partnerRegistration.username = user.username;
        partnerRegistration.name = user.name;
    }
    if (appConfig.AUTO_ACCEPT_PARTNER_REGISTRATION) {
        partnerRegistration.status = Status.SUCCESS;
    }
    partnerRegistration = await partnerRegistration.save();
    res.json(partnerRegistration);
}
const getPartnerRegistration = async function (req, res, next) {
    let userId = req.params.userId;
    if (req.user.id != userId) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let partnerRegistration = await PartnerRegistration.findOne({
        userId: userId,
    });
    res.json(partnerRegistration);
}
module.exports = {
    switchAccount: switchAccount,
    addDemoCash: addDemoCash,
    getNotifications: getNotifications,
    markAllNotificationAsRead: markAllNotificationAsRead,
    removeNotification: removeNotification,
    updateNotification: updateNotification,
    updateUser: updateUser,
    changePassword: changePassword,
    addWalletAddress: addWalletAddress,
    removeWalletAddress: removeWalletAddress,
    savePartnerRegistratrion: savePartnerRegistratrion,
    getPartnerRegistration: getPartnerRegistration,
}