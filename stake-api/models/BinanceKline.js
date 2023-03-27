const adminMongoose = require("../config/adminMongoose");
const BinanceKlineSchema = require("./schemas/BinanceKlineSchema");

let BinanceKline = adminMongoose.model('BinanceKline', BinanceKlineSchema);
module.exports = BinanceKline;