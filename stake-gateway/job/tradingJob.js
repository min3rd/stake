const { response } = require("../app");
const binanceApi = require("../common/binanceApi");
const { SocketRoom } = require("../config/socket.config");
const { Kline } = require("../models/Kline");
async function updateBinancePrice() {
    for (let key in SocketRoom) {
        let apiUrl = "/api/v3/ticker/price?symbol=" + `${SocketRoom[key]}`;
        let response = await binanceApi.get(apiUrl);
        let now = new Date();
        let open = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0);
        let close = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 59);
        let exist = await Kline.findOne({
            symbol: response.data.symbol,
            openTime: open,
            closeTime: close,
        });
        if (!exist) {
            let highPrice = response.data.price;
            exist = new Kline({
                symbol: response.data.symbol,
                openTime: open,
                closeTime: close,
                openPrice: response.data.price,
            });
        }
    }
    setTimeout(updateBinancePrice, process.env.BINANCE_API_DURARION);
}
const tradingJob = function () {
    updateBinancePrice();
}

module.exports = tradingJob;