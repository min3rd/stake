const logger = require('../../common/logger');
const axios = require('axios').default;
const bscApi = axios.create({
    baseURL: "https://api.bscscan.com"
});
async function updateDepositOrder() {
    let endpoint = "/api?module=account&action=txlist&address=" + process.env.MASTER_ADDRESS + "&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=" + process.env.BSCSCAN_API_KEY;
    try {
        let response = await bscApi.get(endpoint);
        logger.info('accountJob_updateDepositOrder', `response=${JSON.stringify(response.data)}`);
    } catch (e) {
        logger.error('accountJob_updateDepositOrder', `e=${e}`);
    }
    setTimeout(() => {
        updateDepositOrder();
    }, 20000);
}

const accountJob = async function () {
    // updateDepositOrder();
}
module.exports = accountJob;