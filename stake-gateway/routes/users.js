var express = require('express');
const { switchAccount, addDemoCash } = require('../services/userService');
const { authenticateToken } = require('../services/authentication');
var router = express.Router();

/* GET users listing. */
router.post('/:userId/switchAccount', authenticateToken, switchAccount);
router.get('/:userId/addDemoCash', authenticateToken, addDemoCash);

module.exports = router;
