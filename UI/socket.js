const io = require('socket.io')();

glob = 0

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      glob = (Math.round(Math.random()*10))
      client.emit('timer', glob);
    }, interval);
  });
  client.on('CH01' => {
    console.log('choi ');
    // setInterval(() => {
    //   glob = (Math.round(Math.random()*10))
    //   client.emit('timer', glob);
    // }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
