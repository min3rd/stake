const ErrorCode = require("../common/errorCode");
const logger = require("../common/logger");
const Migration = require("../models/Migration");

class BaseMigration {
    constructor() {
    }
    create(version, migration = () => { }) {
        let tmp = new BaseMigration();
        tmp.version = version;
        tmp.canRun = false;
        tmp.migration = migration;
        return tmp;
    }
    async prepare() {
        let exist = await Migration.findOne({
            version: this.version,
        });
        if (!exist) {
            this.canRun = true;
        }
    }
    async run() {
        await this.prepare();
        if (!this.canRun) {
            return;
        }
        logger.info('migrations', `-----${this.version}-----`);
        await this.migration();
        await this.post();
    }
    async migration() {
        console.log('migration');
    }
    async post() {
        let version = new Migration({
            version: this.version,
        });
        version = await version.save();
        if (!version) {
            logger.error('migrations', `-----${this.version}-----`);
        }
    }
}
const baseMigration = new BaseMigration();

module.exports = baseMigration;