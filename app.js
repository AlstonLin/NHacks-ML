var express = require('express');
var app = express();
var PORT = 80;
var bodyParser = require('body-parser');
var ML = require('./ml.js');

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
  console.log("TRAIN REQUEST - URL: " + url + ", RESULT: " + result);
  ML.train(url, result);
  res.end();
});

app.get('/predict/:url', function(req, res){
  var url = req.params.url;
  console.log("PREDICT REQUEST - URL: " + JSON.stringify(url));
  res.json({
    "result" : ML.predict(url)
  });
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});

