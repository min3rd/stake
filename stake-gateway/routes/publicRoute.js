const express = require('express');
const { signUp, signIn } = require('../services/authentication');
const { tradingRooms, latestKlines, latestRounds, tradingConfig } = require('../services/tradingService');
const publicRoute = express.Router();

publicRoute.post('/sign-up', signUp);
publicRoute.post('/sign-in', signIn);
publicRoute.get('/trading/rooms', tradingRooms);
publicRoute.get('/trading/rooms/:symbol/klines/latest', latestKlines);
publicRoute.get('/trading/rooms/:symbol/rounds/latest', latestRounds);
publicRoute.get('/trading/rooms/:symbol/config', tradingConfig);
module.exports = publicRoute;