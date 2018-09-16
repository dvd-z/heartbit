var express = require('express');
var path = require('path');
var ema = require('exponential-moving-average');
let app = express();
var http = require( 'http').Server(app);
var io = require('socket.io')(http);

const bodyParser = require('body-parser');
const util = require('util')

var router = express.Router();

glob = {"emotion": "", "posture": ""}

io.on('connection', (client) => {
  console.log("connected")
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    console.log("timer", glob)

    setInterval(() => {
      console.log("timer", glob)

      client.emit('timer', glob);
      glob['emotion'] = ""
      glob['posture'] = ""
    }, interval);
  });
  client.on('CH01', (x) => {
    console.log('choi ');
    // setInterval(() => {
    //   glob = (Math.round(Math.random()*10))
    //   client.emit('timer', glob);
    // }, interval);
  });
});

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
    resp = ema(temp, Math.min(temp.length, 20))
    return parseInt(resp.slice(-1)[0]) > 100;
  }

  var datetime = new Date();
  globalvar.push(req.body.heartrates)
  console.log(checkHeartRate());
  console.log(req.body)

  res.json({"hello": "world! This is the fitbit endpoint"});
});

app.post('/openpose', (req, res) => {
  var datetime = new Date();
  console.log("staritng api", req.body)
  console.log("staritng api", req.body['emotion'])

  if(typeof req.body.posture == 'undefined' && req.body.emotion != "") {
    glob['emotion']=req.body.emotion;
    console.log("pushing emotion", req.body.emotion)
  } else if (req.body.posture != ""){
    if (req.body.posture == "good") {
      glob['posture']=1;
    } else {
      glob['posture']=0;
    }
    console.log("pushing posture", req.body.posture)

  }
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




app.use(logger);
app.use(express.static(path.join(__dirname, 'build')));

// app.use(allowCrossDomain);


http.listen(8000, function() {
  console.log('server stared on port 8000')
});
