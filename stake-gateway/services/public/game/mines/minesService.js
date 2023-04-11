const badRequestError = require("../../../../common/badRequestError");
const { CashAccount } = require("../../../../common/constants");
const ErrorCode = require("../../../../common/errorCode");
const { publicMongoose } = require("../../../../config/publicMongoose");
const { User, ClientUser } = require("../../../../models/User");
const MinesRound = require("../../../../models/game/mines/MinesRound");
const randToken = require('rand-token');
const AES = require('crypto-js/aes');
const logger = require("../../../../common/logger");
const engine = require("../../../../engine");
const { SocketEvent } = require("../../../../config/socket.config");
const POSITION_TYPE = {
    UNKNOWN: 0,
    GEM: 1,
    MINE: 2,
}
class ClientMinesRound {
    constructor(minesRound) {
        this._id = minesRound._id;
        this.userId = minesRound.userId;
        this.size = minesRound.size;
        this.mines = minesRound.mines;
        this.gems = minesRound.gems;
        this.betAmount = minesRound.betAmount;
        this.privateKey = !minesRound.closed ? "" : minesRound.privateKey;
        this.resultHash = minesRound.resultHash;
        this.playerChoices = minesRound.playerChoices;
        this.profitPercent = minesRound.profitPercent;
        this.profit = minesRound.profit;
        this.time = minesRound.time;
        this.started = minesRound.started;
        this.closed = minesRound.closed;
        this.userPaid = minesRound.userPaid;
        this.masterPaid = minesRound.masterPaid;
    }
}

const createMinesRound = async function (req, res, next) {
    const session = await publicMongoose.startSession();
    let userId = req.params.userId;
    if (userId != req.user.id) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let minesRound;
    try {
        await session.startTransaction();
        let user = await User.findById(userId);
        if (!user) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.USER_NOT_FOUND));
        }

        let userCash = user.cashAccount === CashAccount.REAL ? user.cash : user.demoCash;
        let betAmount = parseFloat(req.body.betAmount) ?? 0;
        if (userCash < betAmount) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.CASH_NOT_ENOUGH));
        }

        if (user.cashAccount === CashAccount.REAL) {
            user.cash -= betAmount;
        } else {
            user.demoCash -= betAmount;
        }

        user = await user.save();


        let minesCount = parseInt(req.body.mines) ?? 1;
        let gemsCount = 5 * 5 - minesCount;
        let privateKey = randToken.generate(256);
        let size = 5;
        let gems = [];
        let playerChoices = [];
        for (i = 0; i < size * size; i++) {
            gems.push(Math.pow(2, i));
            playerChoices.push(POSITION_TYPE.UNKNOWN);
        }
        let mines = [];
        for (let i = 0; i < minesCount; i++) {
            let random = Math.random() * gems.length
            mines = mines.concat(gems.splice(random, 1));
        }
        let resultBit = 0;
        for (let gem of gems) {
            resultBit = resultBit | gem;
        }

        let resultHash = AES.encrypt(resultBit.toString(), privateKey);
        minesRound = new MinesRound({
            userId: userId,
            mines: minesCount,
            gems: gemsCount,
            betAmount: betAmount,
            resultBit: resultBit,
            privateKey: privateKey,
            resultHash: resultHash,
            playerChoices: playerChoices.join(''),
            userPaid: true,
            started: true,
        });
        minesRound = await minesRound.save();
        if (!minesRound) {
            await session.abortTransaction();
            await session.endSession();
            return next(badRequestError.make(ErrorCode.MINES_COULD_NOT_CREATE_ROUND));
        }
        await session.commitTransaction();
        await session.endSession();
        logger.info('createMinesRound', `minesRound=${JSON.stringify(minesRound)}`);
        engine.userIo.to(userId).emit(SocketEvent.USER, new ClientUser(user));
    } catch (e) {
        await session.abortTransaction();
        await session.endSession();
        logger.error('createMinesRound', `e=${e}`);
        return next(badRequestError.make(ErrorCode.MINES_COULD_NOT_CREATE_ROUND));
    }
    res.json(new ClientMinesRound(minesRound));
}

const getMinesRoundById = async function (req, res, next) {
    let userId = req.params.userId;
    if (userId != req.user.id) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let minesRound = await MinesRound.findById(req.params.minesRoundId);
    if (!minesRound) {
        return next(badRequestError.make(ErrorCode.MINES_ROUND_NOT_FOUND));
    }
    if (userId != minesRound.userId) {
        return next(badRequestError.make(ErrorCode.MINES_ROUND_NOT_FOUND));
    }
    res.json(new ClientMinesRound(minesRound));
}

const choose = async function (req, res, next) {
    let userId = req.params.userId;
    if (userId != req.user.id) {
        return next(badRequestError.make(ErrorCode.USERID_NOT_MATCH));
    }
    let minesRound = await MinesRound.findById(req.params.minesRoundId);
    if (!minesRound) {
        return next(badRequestError.make(ErrorCode.MINES_ROUND_NOT_FOUND));
    }
    if (minesRound.closed) {
        return next(badRequestError.make(ErrorCode.MINES_ROUND_CLOSED));
    }
    if (userId != minesRound.userId) {
        return next(badRequestError.make(ErrorCode.MINES_ROUND_NOT_FOUND));
    }
    let position = parseInt(req.body.position);
    if (position < 1 || position > (minesRound.size * minesRound.size)) {
        return next(badRequestError.make(ErrorCode.MINES_INVALID_POSITION));
    }
    let chars = `${minesRound.playerChoices}`.split('');
    if (chars[position - 1] != 0) {
        return next(badRequestError.make(ErrorCode.MINES_INVALID_POSITION));
    }
    let result = minesRound.resultBit & Math.pow(2, position - 1);
    if (!result) {
        chars[position - 1] = POSITION_TYPE.MINE;
        minesRound.closed = true;
    } else {
        chars[position - 1] = POSITION_TYPE.GEM;
    }
    minesRound.playerChoices = chars.join("");
    minesRound = await minesRound.save();
    res.json(new ClientMinesRound(minesRound));
}

module.exports = {
    createMinesRound: createMinesRound,
    getMinesRoundById: getMinesRoundById,
    choose: choose,
}