const ErrorCode = require("../common/errorCode");
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
        console.log(this.version);
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
            throw new Error(ErrorCode.MIGRATION_UPDATE_VERSION);
        }
    }
}
const baseMigration = new BaseMigration();

module.exports = baseMigration;