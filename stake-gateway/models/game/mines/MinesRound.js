const { Schema } = require("mongoose");
const { publicMongoose } = require("../../../config/publicMongoose");

const MinesRoundSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    cashAccount: { type: Number, require: true, default: 0, },
    size: { type: Number, default: 5, },
    mines: { type: Number, default: 3, },
    gems: { type: Number, default: 22 },
    betAmount: { type: Number, default: 0, },
    privateKey: { type: String, require: true, },
    resultBit: { type: Number, require: true, },
    resultHash: { type: String, require: true, },
    playerChoices: { type: String, default: '0000000000000000000000000', },
    profitStep: { type: Number, default: 0 },
    profitPercent: { type: Number, default: 1, },
    profit: { type: Number, default: 0, },
    userPaid: { type: Boolean, default: false, },
    masterPaid: { type: Boolean, default: false, },
    time: { type: Date, default: new Date(), },
    started: { type: Boolean, default: false, },
    closed: { type: Boolean, default: false, },
});

const MinesRound = publicMongoose.model('MinesRound', MinesRoundSchema);
module.exports = MinesRound;