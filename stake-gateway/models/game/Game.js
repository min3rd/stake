const { Schema } = require("mongoose");
const { publicMongoose } = require("../../config/publicMongoose");

const GameSchema = new Schema({
    title: { type: String, require: true, index: true, },
    link: { type: String, require: true, index: true, },
    image: { type: String, },
    playerCount: { type: Number, default: 0 },
});
const Game = publicMongoose.model('Game', GameSchema);
module.exports = Game;