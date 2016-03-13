var express = require('express');
var app = express();
var PORT = 80;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.end('Hello World!');
});

app.post('/train', function(req, res){
  var url = req.body.url;
  var result = req.body.result;
  console.log("TRAIN REQUEST: URL: " + url + ", RESULT: " + result);
  res.end("");
});

app.get('/predict/:url', function(req, res){
  var url = req.params.url;
  console.log("PREDICT REQUEST: URL: " + url);
  res.end("");
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});

