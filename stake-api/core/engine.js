const BinanceJob = require("../jobs/binanceJob");
const { TradingJob } = require("../jobs/tradingJob");
const adminSocket = require("../socket/adminSocket");
const userSocket = require("../socket/userSocket");
const app = require("./app");
const io = require("./io");
const server = require("./server");

let port = process.env.PORT || 3000;
class Engine {
    constructor() {
        this.app = app;
        this.server = server;
        this.io = io;
        this.userSocket = userSocket(io);
        this.adminSocket = adminSocket(io);
        this.binanceJob = new BinanceJob();
        this.tradingJob = new TradingJob(io);
    }
    start() {
        this.server.listen(port, () => {
            console.log(`Started on ${port}`);
        });
        this.binanceJob.start();
        this.tradingJob.start();
    }
}

module.exports = Engine;