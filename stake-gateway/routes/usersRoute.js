var express = require('express');
const { switchAccount, addDemoCash, getNotifications, markAllNotificationAsRead, updateNotification } = require('../services/userService');
const { authenticateToken } = require('../services/authentication');
const { call, getTradingCalls } = require('../services/tradingService');
const { removeNotification } = require('../services/userService');
var router = express.Router();

/* GET users listing. */
router.post('/:userId/switchAccount', authenticateToken, switchAccount);
router.get('/:userId/addDemoCash', authenticateToken, addDemoCash);
router.post('/:userId/trading/call', authenticateToken, call);
router.get('/:userId/trading/call', authenticateToken, getTradingCalls);
router.get('/:userId/notifications', authenticateToken, getNotifications);
router.patch('/:userId/notifications', authenticateToken, updateNotification);
router.get('/:userId/notifications/markAllAsRead', authenticateToken, markAllNotificationAsRead);
router.post('/:userId/notifications/remove', authenticateToken, removeNotification);

module.exports = router;
