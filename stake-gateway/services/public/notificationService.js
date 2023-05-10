const AdminNotification = require("../../models/AdminNotification");
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
            description: `you traded betCash and earned profit`,
            data: {
                betCash: betCash,
                profit: benefit,
            },
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
            description: `you traded betCash`,
            data: {
                betCash: betCash,
                profit: benefit,
            },
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
            userId: user.id
        }, {
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
    async user_createDepositOrderNotification(userId, depositOrder) {
        let noti = new Notification({
            userId: userId,
            icon: 'heroicons_outline:currency-dollar',
            title: 'deposit order',
            description: `got new deposit order`,
            time: new Date(),
            read: false,
            link: `/wallet/deposit/${depositOrder.id}`,
        });
        noti = await noti.save();
        return noti;
    }

    async admin_createDepositOrderNotification(userId, depositOrder) {
        let noti = new AdminNotification({
            userId: userId,
            icon: 'heroicons_outline:currency-dollar',
            title: 'deposit order',
            description: `got new deposit order`,
            time: new Date(),
            read: false,
            link: `/management/depositOrders/${depositOrder.id}`,
        });
        noti = await noti.save();
        return noti;
    }

    async user_acceptDepositOrder(userId, depositOrder) {
        let noti = new Notification({
            userId: userId,
            icon: 'heroicons_outline:currency-dollar',
            title: 'deposit order',
            description: 'your deposit order was accepted amount',
            data: depositOrder,
            time: new Date(),
            read: false,
            link: `/wallet/deposit/${depositOrder.id}`,
        });
        noti = await noti.save();
        return noti;
    }

    async admin_acceptDepositOrder(userId, depositOrder) {
        let noti = new AdminNotification({
            userId: userId,
            icon: 'heroicons_outline:currency-dollar',
            title: 'deposit order',
            description: 'your deposit order was accepted amount',
            data: depositOrder,
            time: new Date(),
            read: false,
            link: `/wallet/deposit/${depositOrder.id}`,
        });
        noti = await noti.save();
        return noti;
    }

    async user_denyDepositOrder(userId, depositOrder) {
        let noti = new Notification({
            userId: userId,
            icon: 'heroicons_outline:currency-dollar',
            title: 'deposit order',
            description: 'your deposit order was denied',
            data: depositOrder,
            time: new Date(),
            read: false,
            link: `/wallet/deposit/${depositOrder.id}`,
        });
        noti = await noti.save();
        return noti;
    }

    async admin_denyDepositOrder(userId, depositOrder) {
        let noti = new AdminNotification({
            userId: userId,
            icon: 'heroicons_outline:currency-dollar',
            title: 'deposit order',
            description: 'your deposit order was denied',
            data: depositOrder,
            time: new Date(),
            read: false,
            link: `/wallet/deposit/${depositOrder.id}`,
        });
        noti = await noti.save();
        return noti;
    }
}
const notificationService = new NotificationService();
module.exports = notificationService;