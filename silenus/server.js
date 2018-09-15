var express = require('express');
var app = express();
var path = require('path');
var contact_confirmation = require('./lib/contact_confirmation.js');
var contact_information = require('./lib/contact_information.js');
var contact_register = require('./lib/contact_register.js')
var mailchimp = require('./lib/mailchimp.js')

const bodyParser = require('body-parser');
const util = require('util')

var router = express.Router();

var app = express()

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

app.post('/hook', (req, res) => {
  console.log("req body:", req.body)
  var datetime = new Date();
  console.log(datetime);
  // console.log(util.inspect(req.body, false, null))

  res.json({"hello": "world"});

});



app.get('/api/mail', (req, res) => {
  var host = req.headers.host;
  var origin = req.headers.origin


});

app.use(logger);
app.use(express.static(path.join(__dirname, 'build')));


// app.use(allowCrossDomain);


app.listen(3000, function() {
  console.log('server stared on port 3000')
});
