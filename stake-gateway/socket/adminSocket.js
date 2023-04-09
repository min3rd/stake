const ErrorCode = require("../common/errorCode");

function isValid(request) {

}

const adminSocket = async function (io) {
    const adminIo = io.of('/admin');
    adminIo.use((socket, next) => {
        if (isValid(socket.request)) {
            next();
        } else {
            next(new Error(ErrorCode.UNAUTHORIZATION));
        }
    });

    return adminIo;
}

module.exports = adminSocket;