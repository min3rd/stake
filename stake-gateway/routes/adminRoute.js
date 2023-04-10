const express = require('express');
const { adminSignIn, adminSignInByToken, adminAuthenticateToken } = require('../services/admin/adminService');
const { getTradingRooms, handle_getLatestTradingRounds, handle_updateSwithTradingRoundResult, handle_updateTradingRoom } = require('../services/admin/adminTradingService');
const adminRoute = express.Router();

adminRoute.post('/sign-in', adminSignIn);
adminRoute.post('/sign-in/refreshToken', adminSignInByToken);


adminRoute.get('/trading/rooms', adminAuthenticateToken, getTradingRooms);
adminRoute.post('/trading/rooms', adminAuthenticateToken, handle_updateTradingRoom);
adminRoute.get('/trading/rounds', adminAuthenticateToken, handle_getLatestTradingRounds);
adminRoute.post('/trading/rounds', adminAuthenticateToken, handle_updateSwithTradingRoundResult);

module.exports = adminRoute;