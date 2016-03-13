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
  ML.train(url, result, function(){
    res.end();
  });
});

app.post('/predict', function(req, res){
  var url = req.body.url;
  console.log("PREDICT REQUEST - URL: " + url);
  ML.predict(url, function(result){
    res.json({
      "result" : result
    });
  });
});

app.post('/execute', function(req, res){
  console.log("Training Request received");
  ML.executeTraining(function(){
    res.end();
  })
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});

