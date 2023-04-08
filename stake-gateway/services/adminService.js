const badRequestError = require("../common/badRequestError");
const ErrorCode = require("../common/errorCode");
const AdminUser = require("../models/AdminUser");
const { ClientUser } = require("../models/User");
const { security } = require("./security");
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

function generateAdminAccessToken(clientUser) {
    let clone = Object.assign({}, clientUser);
    let now = new Date().getTime();
    clone.exp = now + parseInt(process.env.TOKEN_LIFETIME);
    return jwt.sign(JSON.stringify(clone), process.env.TOKEN_SECRET);
}

function adminAuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, adminUser) => {
        if (err) return res.sendStatus(403)
        if (adminUser.exp < new Date().getTime()) {
            return res.sendStatus(401);
        }
        let admin = await AdminUser.findOne({
            username: adminUser.username,
        });
        if (!admin) {
            return res.sendStatus(401);
        }
        req.admin = admin
        next();
    })
}

const adminSignIn = async function (req, res, next) {
    let exists = await AdminUser.findOne({
        username: req.body.username,
        password: security.hashPassword(req.body.password),
    });
    if (!exists) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    let clientUser = new ClientUser(exists);
    let accessToken = generateAdminAccessToken(clientUser)
    exists.refreshToken = randToken.generate(128);
    let refreshExpiryAt = new Date().getTime() + parseInt(!req.body.remeberMe ? process.env.REFRESH_TOKEN_LIFETIME : process.env.REFRESH_TOKEN_LIFETIME_REMEMBER);

    exists.refreshExpiryAt = new Date(refreshExpiryAt);
    exists.accessToken = accessToken;
    try {
        await exists.save();
    } catch (e) {
        logger.error('signIn', `error=${e}`);
        return next(badRequestError.make(ErrorCode.TOKEN_GENERATION));
    }
    res.json({
        accessToken: accessToken,
        refreshToken: exists.refreshToken,
        user: clientUser,
    });
}

const adminSignInByToken = async function (req, res, next) {
    let exists = await AdminUser.findOne({
        refreshToken: req.body.refreshToken,
        refreshExpiryAt: {
            $gt: new Date(),
        }
    });
    if (!exists) {
        return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
    }
    let clientUser = new ClientUser(exists);
    let accessToken = generateAdminAccessToken(clientUser)
    exists.refreshToken = randToken.generate(128);
    let refreshExpiryAt = new Date().getTime() + parseInt(!req.body.remeberMe ? process.env.REFRESH_TOKEN_LIFETIME : process.env.REFRESH_TOKEN_LIFETIME_REMEMBER);

    exists.refreshExpiryAt = new Date(refreshExpiryAt);
    exists.accessToken = accessToken;
    try {
        await exists.save();
    } catch (e) {
        logger.error('signIn', `error=${e}`);
        return next(badRequestError.make(ErrorCode.TOKEN_GENERATION));
    }
    res.json({
        accessToken: accessToken,
        refreshToken: exists.refreshToken,
        user: clientUser,
    });
}

module.exports = {
    adminSignIn: adminSignIn,
    adminSignInByToken: adminSignInByToken,
}