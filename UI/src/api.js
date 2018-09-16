import openSocket from 'socket.io-client';
const  socket = openSocket('http://40.76.211.223:8001');
function subscribeToTimer(cb) {
  socket.on('meme', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };
