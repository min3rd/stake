const fs = require('fs');
const moment = require('moment')
const path = require('path');


const LOG_TYPE = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    DEBUG: 'debug',
}
class Logger {
    constructor() {
    }
    log(type = LOG_TYPE.INFO, category = '', message = '') {
        const now = moment(new Date())
        const timestamp = now.format('YYYY/MM/DD HH:mm:ss');
        const filename = now.format('YYYY_MM_DD')
        const logMessage = `[${timestamp}] [${type}] [${category}]:${message}\n`;
        const rootDir = path.join(__dirname, '..');
        const logsFolder = path.join(rootDir, 'logs');

        fs.mkdir(logsFolder, { recursive: true }, (err) => {
            if (err) throw err;
            const logFile = path.join(logsFolder, `${filename}.log`);
            console.log(logMessage);
            fs.appendFile(logFile, logMessage, (err) => {
                if (err) {
                    console.error(`log fail: ${logMessage} error=${err}`);
                    throw err;
                }
            });
        });
    }
    info(category = '', message = '') {
        this.log(LOG_TYPE.INFO, category, message);
    }
    error(category = '', message = '') {
        this.log(LOG_TYPE.ERROR, category, message);
    }
    warn(category = '', message = '') {
        this.log(LOG_TYPE.WARN, category, message);
    }
    debug(category = '', message = '') {
        this.log(LOG_TYPE.DEBUG, category, message);
    }
}
const logger = new Logger();
module.exports = logger