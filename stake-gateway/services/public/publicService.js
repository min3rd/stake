const getConfig = async function (req, res, next) {
    res.json({
        walletAddress: process.env.MASTER_ADDRESS || "0x92b325Fa6e701f46EA66B262BBaC4E1596CDA2Cc",
    });
}

module.exports = {
    getConfig: getConfig,
}