class BadRequestError {
    constructor() {

    }
    createError(res, code) {
        res.status(400);
        return res.json({
            code: code,
        });
    }
    make(code) {
        return new Error(code);
    }
}
const badRequestError = new BadRequestError();
module.exports = badRequestError;