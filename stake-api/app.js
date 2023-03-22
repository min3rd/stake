require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const onSocketConnection = (socket) => {
    require('./socket/userSocket')(io, socket)
};

io.on('connection', onSocketConnection);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});