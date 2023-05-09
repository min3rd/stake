const express = require('express');
const { adminSignIn, adminSignInByToken, adminAuthenticateToken } = require('../services/admin/adminService');
const { getTradingRooms, handle_getLatestTradingRounds, handle_updateSwithTradingRoundResult, handle_updateTradingRoom } = require('../services/admin/adminTradingService');
const { searchUsers, updateUser, getUserById } = require('../services/admin/management/admin_UserService');
const { searchDepositOrders, acceptDepositOrder, denyDepositOrder, getDepositOrderById } = require('../services/admin/management/admin_depositOrderService');
const { searchWithdrawOrder, getWithdrawOrderById, acceptWithdrawOrder, denyWithdrawOrder } = require('../services/admin/management/admin_withdrawOrderService');
const adminRoute = express.Router();

adminRoute.post('/sign-in', adminSignIn);
adminRoute.post('/sign-in/refreshToken', adminSignInByToken);


adminRoute.get('/trading/rooms', adminAuthenticateToken, getTradingRooms);
adminRoute.post('/trading/rooms', adminAuthenticateToken, handle_updateTradingRoom);
adminRoute.get('/trading/rounds', adminAuthenticateToken, handle_getLatestTradingRounds);
adminRoute.post('/trading/rounds', adminAuthenticateToken, handle_updateSwithTradingRoundResult);


adminRoute.get('/users', adminAuthenticateToken, searchUsers);
adminRoute.patch('/users/:userId', adminAuthenticateToken, updateUser);
adminRoute.get('/users/:userId', adminAuthenticateToken, getUserById);

adminRoute.get('/depositOrders', adminAuthenticateToken, searchDepositOrders);
adminRoute.get('/depositOrders/:depositOrderId', adminAuthenticateToken, getDepositOrderById);
adminRoute.post('/depositOrders/:depositOrderId/acceptDepositOrder', adminAuthenticateToken, acceptDepositOrder);
adminRoute.post('/depositOrders/:depositOrderId/denyDepositOrder', adminAuthenticateToken, denyDepositOrder);

adminRoute.get('/withdrawOrders', adminAuthenticateToken, searchWithdrawOrder);
adminRoute.get('/withdrawOrders/:withdrawOrderId', adminAuthenticateToken, getWithdrawOrderById);
adminRoute.post('/withdrawOrders/:withdrawOrderId/acceptWithdrawOrder', adminAuthenticateToken, acceptWithdrawOrder);
adminRoute.post('/withdrawOrders/:withdrawOrderId/denyWithdrawOrder', adminAuthenticateToken, denyWithdrawOrder);

module.exports = adminRoute;