
var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('../public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', onNewConnection);

function onNewConnection(socket) {
    // console.log(socket);

    socket.on('mouse', mouseMessage);
    
    function mouseMessage(data) {
        console.log(data);
        socket.broadcast.emit('mouse', data);
    }
}
