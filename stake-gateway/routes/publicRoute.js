const express = require('express');
const { signUp, signIn, noGuard } = require('../services/authentication');
const { tradingRooms, latestKlines, latestRounds, tradingConfig } = require('../services/tradingService');
const { getNotifications } = require('../services/userService');
const publicRoute = express.Router();

publicRoute.post('/sign-up', signUp);
publicRoute.post('/sign-in', signIn);
publicRoute.get('/trading/rooms', tradingRooms);
publicRoute.get('/trading/rooms/:symbol/klines/latest', latestKlines);
publicRoute.get('/trading/rooms/:symbol/rounds/latest', latestRounds);
publicRoute.get('/trading/rooms/:symbol/config', tradingConfig);
publicRoute.get('/notifications', noGuard, getNotifications);
module.exports = publicRoute;