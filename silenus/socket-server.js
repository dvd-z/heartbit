var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('meme', function(msg){
    console.log('message: ' + msg);
    socket.emit('meme', msg, msg);
    
    client.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      // setInterval(() => {
      //   glob = (Math.round(Math.random()*10))
        client.emit('meme', msg);
      // }, interval);
    });
  });

});

http.listen(8001, function(){
  console.log('listening on *:8001');
});
