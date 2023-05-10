const { Schema } = require("mongoose");
const { publicMongoose } = require("../config/publicMongoose");

const NewsSchema = new Schema({
    time: { type: Date, default: new Date(), },
    title: { type: String, },
    description: { type: String, },
    data: { type: Schema.Types.Mixed, },
});
const News = publicMongoose.model('News', NewsSchema);
module.exports = News;