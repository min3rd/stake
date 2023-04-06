class Engine {
    constructor() {
        this._app = null;
        this._io = null;
        this._publicIo = null;
        this._userIo = null;
        this._tradingJob = null;
        this._migration = null;
    }
    init(app, io, publicIo, userIo, tradingJob, migration) {
        this._app = app;
        this._io = io;
        this._publicIo = publicIo;
        this._userIo = userIo;
        this._tradingJob = tradingJob;
        this._migration = migration;
    }
    get app() {
        return this._app;
    }
    get io() {
        return this._io;
    }
    get publicIo() {
        return this._publicIo;
    }
    get userIo() {
        return this._userIo;
    }
    get tradingJob() {
        return this._tradingJob;
    }
    get migration() {
        return this._migration;
    }
}
const engine = new Engine();
module.exports = engine;