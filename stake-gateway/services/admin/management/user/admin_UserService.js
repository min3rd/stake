const logger = require("../../../../common/logger");
const { SocketEvent } = require("../../../../config/socket.config");
const engine = require("../../../../engine");
const { User, ClientUser } = require("../../../../models/User")

const searchUsers = async function (req, res, next) {
    let query = !req.query.query ? {} : { username: { $regex: `.*${req.query.query}.*` } };
    let users = await User.find(query).skip(req.query.offset ?? 0).limit(req.query.size ?? 10);
    let mapped = users.map(e => new ClientUser(e));
    return res.json(mapped);
}


const getUserById = async function (req, res, next) {
    let user = await User.findById(req.params.userId);
    return res.json(new ClientUser(user));
}

const updateUser = async function (req, res, next) {
    let user = await User.findById(req.body.id);
    logger.info('ADMIN_updateUser_start', `user=${JSON.stringify(user)}`);
    user.cash = req.body.cash;
    user.demoCash = req.body.demoCash;
    user.blocked = req.body.blocked;
    user = await user.save();
    engine.userIo.to(user._id).emit(SocketEvent.USER, new ClientUser(user));
    logger.info('ADMIN_updateUser_end', `user=${JSON.stringify(user)}`);
    res.json(new ClientUser(user));
}

module.exports = {
    searchUsers: searchUsers,
    updateUser: updateUser,
    getUserById: getUserById,
}