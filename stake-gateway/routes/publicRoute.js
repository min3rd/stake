const express = require('express');
const publicRoute = express.Router();

publicRoute.post('/signup', function (req, res) {
    console.log(req);
});

module.exports = publicRoute;