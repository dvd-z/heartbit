var express = require('express');
var app = express();
var path = require('path');
var ema = require('exponential-moving-average');
var io = require('socket.io')(server);

const bodyParser = require('body-parser');
const util = require('util')

var router = express.Router();

var app = express()

globalvar = []
heartRateSmooth = [];

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

var logger = function(req, res, next) {
  next();
}



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/fitbit', (req, res) => {
  var checkHeartRate = function() {
    temp = globalvar.slice(Math.max(globalvar.length - 20, 1))
    resp = ema(temp, Math.min(globalvar.length, 20))
    return parseInt(resp.slice(-1)[0]) > 100;
  }

  var datetime = new Date();
  globalvar.push(req.body.heartrates)
  console.log(checkHeartRate());
  console.log(req.body)

  res.json({"hello": "world! This is the fitbit endpoint"});
});

app.post('/openpose', (req, res) => {
  console.log("req body:", req.body)
  var datetime = new Date();
  console.log(datetime);
  // console.log(util.inspect(req.body, false, null))

  res.json({"hello": "world! This is the openpose endpoint"});
});


app.post('/other', (req, res) => {
  console.log("req body:", req.body)
  var datetime = new Date();
  console.log(datetime);
  // console.log(util.inspect(req.body, false, null))

  res.json({"hello": "world! This is the other endpoint"});
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('CH01', function (data) {
    console.log("nice");
  });
});


app.use(logger);
app.use(express.static(path.join(__dirname, 'build')));


// app.use(allowCrossDomain);


app.listen(3000, function() {
  console.log('server stared on port 3000')
});
