require('dotenv').config();
let socketIo = require('socket.io');
let app = require('express')();
let server = require('http').createServer(app);
let io = socketIo(server);
let wss = require('ws');
const cors = require('cors');
app.use(cors());
io.on('open', () => {
    console.log('socket io opened');
});

const market = new wss('wss://stream.binance.com:9443/ws/btcusdt@kline_1s');
market.on('message', (data) => {
    const message = JSON.parse(data);
    io.emit('kline', message);
});

setInterval(() => {
    let now = new Date();
    io.emit('now', now.getTime());
}, 1000);
io.on('connection', (socket) => {
    socket.on('disconnect', function () {
        io.emit('usersActivity', {
            user: socket.username,
            event: 'chatLeft'
        });
    });

    socket.on('setUserName', (name) => {
        socket.username = name;
        io.emit('usersActivity', {
            user: name,
            event: 'chatJoined'
        });
    });

    socket.on('sendTheMessage', (message) => {
        io.emit('message', {
            msg: message.text,
            user: socket.username,
            createdAt: new Date()
        });
    });
});

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Started on ${port}`);
});