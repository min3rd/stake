const adminSocket = require("../socket/adminSocket");
const userSocket = require("../socket/userSocket");
const app = require("./app");
const io = require("./io");
const server = require("./server");

let port = process.env.PORT || 3000;
class Engine {
    constructor() {
        this.app = app;
        this.server = server;
        this.io = io;
        this.userSocket = userSocket(io);
        this.adminSocket = adminSocket(io);
    }
    start() {
        this.server.listen(port, () => {
            console.log(`Started on ${port}`);
        });
    }
}

module.exports = Engine;