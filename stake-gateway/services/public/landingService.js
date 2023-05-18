const logger = require("../../common/logger");
const News = require("../../models/News");

const getLatestNews = async function (req, res, next) {
    //get the latest news from the database and start greater than now and end less than now
    let allNews = await News.find({
        start: {
            $lte: new Date(),
        },
        end: {
            $gte: new Date(),
        },
    }).sort({ start: 1 }).limit(10);
    res.json(allNews);
}

module.exports = {
    getLatestNews: getLatestNews,
}