const WebSocket = require('ws');

const ws = new WebSocket('ws://40.76.211.223:8080');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
