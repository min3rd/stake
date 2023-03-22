require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});