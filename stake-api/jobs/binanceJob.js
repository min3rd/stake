let wss = require('ws');
const BinanceStream = require('../config/BinanceStream');
const { binanceKlineService } = require('../services/BinanceKlineService');
class BinanceJob {
    constructor() {
        this.btcWs = new wss(BinanceStream.stream.kline.BTCUSDT);
        this.ethWs = new wss(BinanceStream.stream.kline.ETHUSDT);
        this.bnbWs = new wss(BinanceStream.stream.kline.BNBUSDT);
        this.btcWs.on('message', (message) => {
            const data = JSON.parse(message);
            binanceKlineService.addKline(data);
        });
        this.ethWs.on('message', (message) => {
            const data = JSON.parse(message);
            binanceKlineService.addKline(data);
        });
        this.bnbWs.on('message', (message) => {
            const data = JSON.parse(message);
            binanceKlineService.addKline(data);
        });
    }
    start() {
        this.btcWs = new wss(BinanceStream.stream.kline.BTCUSDT);
        this.ethWs = new wss(BinanceStream.stream.kline.ETHUSDT);
        this.bnbWs = new wss(BinanceStream.stream.kline.BNBUSDT);
    }
    stop() {
        this.btcWs.close();
        this.ethWs.close();
        this.bnbWs.close();
    }
    restart(){
        this.stop();
        this.start();
    }
}
module.exports = BinanceJob;