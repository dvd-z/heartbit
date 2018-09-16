var io = require('socket.io-client');
var socket = io.connect('http://40.76.211.223:8001', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('meme', 32, 'test msg');
console.log("done")
