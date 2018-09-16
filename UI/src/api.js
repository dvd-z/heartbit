import openSocket from 'socket.io-client';
const  socket = openSocket('http://40.76.211.223:8000');
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1500);
}
export { subscribeToTimer };
