const { Schema } = require("mongoose");
const { publicMongoose } = require("../../../config/publicMongoose");

const MinesRoundSchema = new Schema({
    userId: { type: String, require: true, index: true, },
    mines: { type: Number },
});

const MinesRound = publicMongoose.model('Mines', MinesRoundSchema);
module.exports = MinesRound;