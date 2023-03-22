const cron = require('node-cron');
module.exports = function (app) {
    app.ws('/client', function(ws, req){
        ws.on('message', message => {
            console.log(message);
        });
        cron.schedule('* * * * * *', ()=>{
            ws.emit('message', 'message');
        });
    });
}