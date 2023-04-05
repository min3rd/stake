var express = require('express');
const { switchAccount, addDemoCash } = require('../services/userService');
const { authenticateToken } = require('../services/authentication');
const { call } = require('../services/tradingService');
var router = express.Router();

/* GET users listing. */
router.post('/:userId/switchAccount', authenticateToken, switchAccount);
router.get('/:userId/addDemoCash', authenticateToken, addDemoCash);
router.post('/:userId/trading/call', authenticateToken, call);

module.exports = router;
