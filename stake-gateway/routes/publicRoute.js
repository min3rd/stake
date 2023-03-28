const express = require('express');
const { signUp, signIn } = require('../services/authentication');
const publicRoute = express.Router();

publicRoute.post('/sign-up', signUp);
publicRoute.post('/sign-in', signIn);

module.exports = publicRoute;