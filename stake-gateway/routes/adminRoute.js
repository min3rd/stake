const express = require('express');
const { adminSignIn, adminSignInByToken, adminAuthenticateToken } = require('../services/admin/adminService');
const { getTradingRooms, handle_getLatestTradingRounds, handle_updateSwithTradingRoundResult, handle_updateTradingRoom } = require('../services/admin/adminTradingService');
const { searchUsers, updateUser, getUserById } = require('../services/admin/management/admin_UserService');
const { searchDepositOrders, acceptDepositOrder, denyDepositOrder, getDepositOrderById } = require('../services/admin/management/admin_depositOrderService');
const { searchWithdrawOrder, getWithdrawOrderById, acceptWithdrawOrder, denyWithdrawOrder } = require('../services/admin/management/admin_withdrawOrderService');
const { getAppConfig, updateAppConfig } = require('../services/admin/management/admin_settingService');
const { getAllNews, getNewsById, updateNewsById, deleteNewsById, createNews } = require('../services/admin/admin_newsService');
const { getPartnerRegistration, getPartnerRegistrations, savePartnerRegistration } = require('../services/admin/management/admin_partnerRegistration');
const { getMonthlyProfits, getMonthlyProfit, saveMonthlyProfit, createMonthlyProfit, deleteMonthlyProfit } = require('../services/admin/management/admin_monthlyProfit');
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

adminRoute.get('/appConfig', adminAuthenticateToken, getAppConfig);
adminRoute.post('/appConfig', adminAuthenticateToken, updateAppConfig);

adminRoute.get('/news', adminAuthenticateToken, getAllNews);
adminRoute.get('/news/:id', adminAuthenticateToken, getNewsById);
adminRoute.post('/news/:id', adminAuthenticateToken, updateNewsById);
adminRoute.delete('/news/:id', adminAuthenticateToken, deleteNewsById);
adminRoute.post('/news', adminAuthenticateToken, createNews);

adminRoute.get('/partnerRegistrations', adminAuthenticateToken, getPartnerRegistrations);
adminRoute.get('/partnerRegistrations/:id', adminAuthenticateToken, getPartnerRegistration);
adminRoute.post('/partnerRegistrations/:id', adminAuthenticateToken, savePartnerRegistration);

adminRoute.get('/monthlyProfits', adminAuthenticateToken, getMonthlyProfits);
adminRoute.post('/monthlyProfits', adminAuthenticateToken, createMonthlyProfit);
adminRoute.get('/monthlyProfits/:id', adminAuthenticateToken, getMonthlyProfit);
adminRoute.post('/monthlyProfits/:id', adminAuthenticateToken, saveMonthlyProfit);
adminRoute.delete('/monthlyProfits/:id', adminAuthenticateToken, deleteMonthlyProfit);

module.exports = adminRoute;