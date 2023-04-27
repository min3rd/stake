var express = require('express');
const { authenticateToken } = require('../services/public/authentication');
const { call, getTradingCalls } = require('../services/public/tradingService');
const { switchAccount, addDemoCash, getNotifications, updateNotification, markAllNotificationAsRead, removeNotification, updateUser, changePassword, addWalletAddress, removeWalletAddress } = require('../services/public/userService');
const { createMinesRound, getMinesRoundById, choose, cashout, getMinesRounds } = require('../services/public/game/mines/minesService');
const { getDepositOrderById, getDepositOrders, deleteDepositOrder, checkTransaction } = require('../services/public/wallet/depositService');
const { getWithdrawOrders, getWithdrawOrder, createWithdrawOrder, deleteWithdrawOrder, getCashTransfers, getCashTransfer, createCashTransfer } = require('../services/public/wallet/withdrawService');
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
router.get('/:userId/mines/rounds', authenticateToken, getMinesRounds);
router.get('/:userId/mines/rounds/:minesRoundId', authenticateToken, getMinesRoundById);
router.post('/:userId/mines/rounds/:minesRoundId/choose', authenticateToken, choose);
router.post('/:userId/mines/rounds/:minesRoundId/cashout', authenticateToken, cashout);

router.post('/:userId/wallets', authenticateToken, addWalletAddress);
router.delete('/:userId/wallets/:address', authenticateToken, removeWalletAddress);

router.post('/:userId/wallet/checkTransaction', authenticateToken, checkTransaction);
router.get('/:userId/wallet/depositOrders', authenticateToken, getDepositOrders);
router.get('/:userId/wallet/depositOrders/:depositOrderId', authenticateToken, getDepositOrderById);
router.delete('/:userId/wallet/depositOrders/:depositOrderId', authenticateToken, deleteDepositOrder);

router.post('/:userId/wallet/withdrawOrders', authenticateToken, createWithdrawOrder);
router.get('/:userId/wallet/withdrawOrders', authenticateToken, getWithdrawOrders);
router.get('/:userId/wallet/withdrawOrders/:withdrawOrderId', authenticateToken, getWithdrawOrder);
router.delete('/:userId/wallet/withdrawOrders/:withdrawOrderId', authenticateToken, deleteWithdrawOrder);

router.post('/:userId/wallet/cashTransfers', authenticateToken, createCashTransfer);
router.get('/:userId/wallet/cashTransfers', authenticateToken, getCashTransfers);
router.get('/:userId/wallet/cashTransfers/:cashTransferId', authenticateToken, getCashTransfer);

module.exports = router;
