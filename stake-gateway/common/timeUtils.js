class TimeUtils {
    static getOpenTime(now = new Date()) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0);

    }
    static getCloseTime(now = new Date()) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 59);
    }
}
module.exports = TimeUtils;