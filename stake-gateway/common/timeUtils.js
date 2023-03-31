class TimeUtils {
    static getOpenDate(now = new Date()) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0);

    }
    static getCloseDate(now = new Date()) {
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 59);
    }
    static getPreviousOpenDate(now = new Date()) {
        let minutes = now.getMinutes();
        let hours = now.getHours();
        let date = now.getDate();
        if (hours == 0 && minutes == 0) {
            hours = 23;
            minutes = 59;
            date -= 1;
        }
        else if (minutes == 0) {
            minutes = 59;
            hours -= 1;
        } else {
            minutes -= 1;
        }
        return new Date(now.getFullYear(), now.getMonth(), date, hours, minutes, 0);
    }
    static getPreviousCloseDate(now = new Date()) {
        let minutes = now.getMinutes();
        let hours = now.getHours();
        let date = now.getDate();
        if (hours == 0 && minutes == 0) {
            hours = 23;
            minutes = 59;
            date -= 1;
        }
        else if (minutes == 0) {
            minutes = 59;
            hours -= 1;
        } else {
            minutes -= 1;
        }
        return new Date(now.getFullYear(), now.getMonth(), date, hours, minutes, 59);
    }
}
module.exports = TimeUtils;