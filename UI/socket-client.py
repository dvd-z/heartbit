var io = require('socket.io-client');
var socket = io.connect('http://40.76.211.223:8000', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg');
