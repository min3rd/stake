const { default: mongoose } = require("mongoose");
const config = {
    'url': 'mongodb://127.0.0.1:27017',
    'options': {
        //	'user':   'admin',
        //	'pass':   'admin',
        'dbName': 'stake', // red
        'useNewUrlParser': true,
        'useUnifiedTopology': true,
        //'autoIndex':       false,
    },
};
const adminMongoose = mongoose;
require('mongoose-long')(adminMongoose);
adminMongoose.connect(config.url, config.options);
module.exports = adminMongoose;