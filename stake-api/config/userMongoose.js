
const { mongoose } = require("mongoose");
const userMongoose = mongoose;
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
userMongoose.connect(config.url, config.options);
module.exports = userMongoose;