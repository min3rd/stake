const cron = require('node-cron');
module.exports = function (io, socket) {
    cron.schedule("* * * * *", () => {
        console.log('send message');
        io.emit('something', 'something');
    });
    socket.on();
}