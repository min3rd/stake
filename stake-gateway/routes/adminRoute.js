const express = require('express');
const { adminSignIn, adminSignInByToken } = require('../services/adminService');
const adminRoute = express.Router();

adminRoute.post('/sign-in', adminSignIn);
adminRoute.post('/sign-in/refreshToken', adminSignInByToken);

module.exports = adminRoute;