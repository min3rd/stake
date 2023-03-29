const axios = require('axios').default;
const binanceApi = axios.create({
    baseURL: "https://api.binance.com",
})

module.exports = binanceApi;