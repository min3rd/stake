class TradingJob {
    constructor(io) {
        this.interval = null;
        this.io = io;
    }
    start() {
        this.interval = setInterval(() => {
            let now = new Date();
            this.io.emit(now.getTime());
        }, 1000);
    }
    stop() {
        clearInterval(this.interval);
    }
    restart() {
        this.stop();
        this.start();
    }
}

module.exports = {
    TradingJob: TradingJob,
}