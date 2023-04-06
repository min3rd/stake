const ErrorCode = require("../common/errorCode");
const validateRegex = require("../common/validateRegex");
const { User, PublicUser } = require("../models/User");
const { security } = require("./security");
const jwt = require('jsonwebtoken');
const { badRequestError } = require("../common/badRequestError");
const randToken = require('rand-token');
function generateAccessToken(publicUser, rememberMe = false) {
    let clone = Object.assign({}, publicUser);
    let now = new Date().getTime();
    clone.exp = now + parseInt(!rememberMe ? process.env.TOKEN_LIFETIME : process.env.TOKEN_LIFETIME_REMEMBER);
    return jwt.sign(JSON.stringify(clone), process.env.TOKEN_SECRET);
}
const validate = (data) => {
    if (!data.username) {
        throw new Error(ErrorCode.USERNAME_NOT_BLANK);
    }
    let username = `${data.username}`;
    if (username.length < 6 || username.length > 32) {
        throw new Error(ErrorCode.USERNAME_MUST_6_32);
    }
    if (!validateRegex.USERNAME.test(username)) {
        throw new Error(ErrorCode.WRONG_USERNAME_FORMAT);
    }
    if (!data.password) {
        throw new Error(ErrorCode.PASSWORD_NOT_BLANK);
    }
    let password = `${data.password}`;
    if (password.length < 6 || password.length > 32) {
        throw new Error(ErrorCode.PASSWORD_MUST_6_32);
    }
    if (!data.name) {
        throw new Error(ErrorCode.NAME_NOT_BLANK);
    }
    let name = `${data.name}`;
    if (name.length < 6 || name.length > 32) {
        throw new Error(ErrorCode.NAME_MUST_6_32);
    }
    return {
        username: username,
        name: name,
        password: password,
    };
}

const signUp = async (req, res) => {
    let body = req.body;
    let valid = validate(body);
    let exist = await User.findOne({
        username: valid.username,
    });
    if (!exist) {
        let user = new User({
            username: valid.username,
            name: valid.name,
            password: security.hashPassword(valid.password),
        });
        user = await user.save();
        if (!user) {
            throw new Error(ErrorCode.SIGN_UP_FAILED);
        }
        res.send();
    }
    badRequestError.createError(res, ErrorCode.USERNAME_EXISTS);
}

const signIn = async (req, res) => {
    let body = req.body;
    let exist = await User.findOne({
        username: body.username,
        password: security.hashPassword(body.password),
    });
    if (!exist) {
        badRequestError.createError(res, ErrorCode.USER_NOT_EXIST);
    }
    let publicUser = new PublicUser(exist);
    let accessToken = generateAccessToken(publicUser)
    exist.refreshToken = randToken.generate(128);
    exist.accessToken = accessToken;
    try {
        await exist.save();
    } catch (e) {
        throw new Error(ErrorCode.TOKEN_GENERATION);
    }
    res.json({
        accessToken: accessToken,
        refreshToken: exist.refreshToken,
        user: publicUser,
    });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function noGuard(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        next();
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            next();
        }
        req.user = user
        next()
    })
}
module.exports = {
    signUp: signUp,
    signIn: signIn,
    authenticateToken: authenticateToken,
    noGuard: noGuard,
}
