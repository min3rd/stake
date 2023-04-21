var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../public/json/public.doc.json');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
module.exports = router;
