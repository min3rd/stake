const News = require("../../models/News")

const getAllNews = async function (req, res, next) {
    let news = await News.find({});
    res.json(news);
}

// get news by id
const getNewsById = async function (req, res, next) {
    let news = await News.findById(req.params.id);
    res.json(news);
}

// update news by id and request body
const updateNewsById = async function (req, res, next) {
    let news = await News.findByIdAndUpdate(req.params.id, req.body);
    res.json(news);
}

//delete news by id
const deleteNewsById = async function (req, res, next) {
    let news = await News.findByIdAndDelete(req.params.id);
    res.json(news);
}

// create news
const createNews = async function (req, res, next) {
    let news = await News.create(req.body);
    res.json(news);
}

module.exports = {
    getAllNews: getAllNews,
    getNewsById: getNewsById,
    updateNewsById: updateNewsById,
    deleteNewsById: deleteNewsById,
    createNews: createNews,
}