const Notification = require("../../models/Notification");

class NotificationService {
    constructor() {

    }
    async createTradingCallResult(user, isWin, betCash, benefit) {
        let title = isWin ? 'trading win' : 'trading lose'
        let noti = new Notification({
            userId: user.id,
            icon: 'heroicons_outline:currency-dollar',
            title: title,
            description: `you traded ${betCash} and earned ${benefit}`,
            time: new Date(),
            read: false,
        });
        noti = await noti.save();
        return noti;
    }
    async createTradingCall(user, betCash, benefit) {
        let noti = new Notification({
            userId: user.id,
            icon: 'heroicons_outline:currency-dollar',
            title: 'trading call',
            description: `you traded ${betCash} and earned ${benefit} if win`,
            time: new Date(),
            read: false,
        });
        noti = await noti.save();
        return noti;
    }
    async getAll(user) {
        return await Notification.find({
            userId: user.id,
        });
    }

    async markAllAsRead(user) {
        await Notification.updateMany({
            userId: user.id,
            read: true,
        });
        return await this.getAll(user);
    }
    async remove(user, id) {
        return await Notification.deleteOne({
            userId: user.id,
            _id: id
        });
    }

    async update(user, notification) {
        let exists = await Notification.findOne({
            userId: user.id,
            _id: notification._id,
        });
        exists.read = notification.read;
        exists = await exists.save();
        return exists;
    }

    /**
     * 
     * @param {DepositOrder} depositOrder 
     */
    async createDepositOrder(userId, depositOrder) {
        let noti = new Notification({
            userId: userId,
            icon: 'heroicons_outline:currency-dollar',
            title: 'got new deposit order',
            description: ``,
            time: new Date(),
            read: false,
            link: `/management/depositOrder/${depositOrder.id}`,
        });
        noti = await noti.save();
        return noti;
    }
}
const notificationService = new NotificationService();
module.exports = notificationService;