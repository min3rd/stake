class BadRequestError {
    constructor() {

    }
    createError(res, code) {
        res.status(400);
        res.json({
            code: code,
        });
    }
}
const badRequestError = new BadRequestError();
module.exports = badRequestError;