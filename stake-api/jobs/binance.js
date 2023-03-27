let wss = require('ws');
const BinanceStream = require('../config/BinanceStream');
const { binanceKlineService } = require('../services/BinanceKlineService');
class BinanceJob {
    constructor() {
        this.btcWs = new wss(BinanceStream.stream.kline.BTCUSDT);
        this.ethWs = new wss(BinanceStream.stream.kline.ETHUSDT);
        this.bnbWs = new wss(BinanceStream.stream.kline.BNBUSDT);
    }
    start() {
        this.btcWs.on('message', (message) => {
            const data = JSON.parse(message);
            binanceKlineService.addKline(data);
        });
        this.ethWs.on('message', (message) => {
            const data = JSON.parse(message);
        });
        this.bnbWs.on('message', (message) => {
            const data = JSON.parse(message);
        });
    }
}
module.exports = BinanceJob;