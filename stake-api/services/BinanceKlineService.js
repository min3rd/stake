const BinanceKline = require("../models/BinanceKline");

class BinanceKlineService {
    constructor() { }
    addKline(data) {
        BinanceKline.findOne(
            {
                symbol: data.s || '',
                startTime: data.k.t || '',
                closeTime: data.k.T || '',
            }
        ).then(exists => {
            if (!exists) {
                let kline = new BinanceKline({
                    symbol: data.s || '',
                    startTime: data.k.t || '',
                    closeTime: data.k.T || '',
                    openPrice: data.k.o || 0,
                    highPrice: data.k.h || 0,
                    lowPrice: data.k.l || 0,
                    closePrice: data.k.c || 0,
                    closed: data.k.x || false,
                });
                kline.save();
            }
        });
    }
}
const binanceKlineService = new BinanceKlineService();
module.exports = { BinanceKlineService, binanceKlineService }