const { default: axios } = require("axios");

const bscApi = axios.create({
    baseURL: 'https://api.bscscan.com',
});

module.exports = bscApi;