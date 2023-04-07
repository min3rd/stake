export class TimeUtils {
    static getOpenDate(now = new Date()) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0);

    }
    static getCloseDate(now = new Date()) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 59);
    }
}