var express = require('express');
const { authenticateToken } = require('../services/public/authentication');
const { call, getTradingCalls } = require('../services/public/tradingService');
const { switchAccount, addDemoCash, getNotifications, updateNotification, markAllNotificationAsRead, removeNotification, updateUser, changePassword } = require('../services/public/userService');
const { createMinesRound, getMinesRoundById, choose } = require('../services/public/game/mines/minesService');
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
router.post('/:userId/user', authenticateToken, updateUser);
router.post('/:userId/user/changePassword', authenticateToken, changePassword);
router.post('/:userId/mines/rounds', authenticateToken, createMinesRound);
router.get('/:userId/mines/rounds/:minesRoundId', authenticateToken, getMinesRoundById);
router.post('/:userId/mines/rounds/:minesRoundId/choose', authenticateToken, choose);



module.exports = router;
