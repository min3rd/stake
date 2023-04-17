const express = require('express');
const { signUp, signIn, signInByRefreshToken, noGuard } = require('../services/public/authentication');
const { tradingRooms, latestKlines, latestRounds, tradingConfig } = require('../services/public/tradingService');
const { getNotifications } = require('../services/public/userService');
const { getConfig } = require('../services/public/publicService');
const publicRoute = express.Router();

publicRoute.post('/sign-up', signUp);
publicRoute.post('/sign-in', signIn);
publicRoute.post('/sign-in/refreshToken', signInByRefreshToken);
publicRoute.get('/trading/rooms', tradingRooms);
publicRoute.get('/trading/rooms/:symbol/klines/latest', latestKlines);
publicRoute.get('/trading/rooms/:symbol/rounds/latest', latestRounds);
publicRoute.get('/trading/rooms/:symbol/config', tradingConfig);
publicRoute.get('/notifications', noGuard, getNotifications);
publicRoute.get('/config', getConfig);
module.exports = publicRoute;