const { Schema } = require('mongoose');
const publicMongoose = require('../config/publicMongoose');
const KlineSchema = new Schema({});
const Kline = publicMongoose.model('Kline', KlineSchema);
module.exports = {
    KlineSchema: KlineSchema,
    Kline: Kline,
}