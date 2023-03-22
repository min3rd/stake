require('dotenv').config();
const cors = require('cors');
const express = require('express');
const port = process.env.PORT;
const app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}));
const expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
    return next();
});

app.get('/client', function (req, res, next) {
    res.end();
});

app.ws('/client', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});