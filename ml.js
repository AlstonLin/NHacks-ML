var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect,
    Perceptron = synaptic.Architect.Perceptron;
var http = require('http');
var CLARIFAI_HOST = "http://api.clarifai.com";
var CLARIFAI_COLOR_PATH = "/v1/color/";
var CLARIFAI_ACCESS_TOKEN = "eHXOOi5GS6bjEKICqHuKz5Rm3lQUIO";


// TEMP
var temp = new Perceptron(1, 10, 1);
var trainingSet = [{input: 0, output: 0}, {input: 1, output: 1}, {input: 2, output: 4}];
var training = temp.trainer.train(trainingSet, {
  iterations: 2000,
    log: false,
    error: 1e-6,
    cost: Trainer.cost.MSE
});
console.log("Training: " + JSON.stringify(training));
console.log("Predict: " + temp.activate([0]));
// NEURAL NETWORK
var network = new Perceptron(6, 4, 1);
var trainingSet = [];
// EXPORTS
var curl = require('curlrequest');

module.exports = {
  // Note: actually just adds data
  train : function(url, result, callback){
    getClarifaiData(url, function(data){
      trainingSet.push({
        input: data,
        output: [result]
      });
    });
    callback();
  },
  predict : function(url, callback){
    getClarifaiData(url, function(data){
      var result = network.activate(data);
      console.log("Prediction result: " + result);
      callback(result); 
    }); 
  },
  executeTraining : function(callback){
    console.log("Training Started with training set of size " + trainingSet.length);
    network.trainer.train(trainingSet, {
      rate: .08,
      iterations: 3000,
      error: .05,
      shuffle: true,
      log: 10,
      cost: Trainer.cost.MSE
    });
    callback();
  }
};

// Stuff TODO
function saveParams(params){
}

// SCRAPING
function getClarifaiData(url, callback) {
 curl.request({url:CLARIFAI_HOST + CLARIFAI_COLOR_PATH + "?access_token=" + CLARIFAI_ACCESS_TOKEN + "&url=" + url}, function(err,response,body){
    response = JSON.parse (response);


      console.log("TEMP: " + response);
      console.log("STATUS: " + response.status_code);
      var colors = response.results[0].colors;


      var data = [];
      var used = [];
      var highestDesity;
      var usedFlag;

      for (var i = 0; i < 3; i++) {
        highestDensity = -1;
        for (var j = 0; j < colors.length; j++) {
          usedFlag = false;
          for (var k = 0; k < used.length && !usedFlag; k++) {
            if (j == used[k]) usedFlag = true;
          }
          if (!usedFlag) {
            if (highestDensity == -1) {
              highestDensity = j;
            } else if (colors[highestDensity].density < colors[j].density) {
              highestDensity = j;
            }
          }
        }

        if (highestDensity == -1 ) {
          data.push (data[0]);
          data.push (data[1]);
        } else {
          used.push (highestDensity);
          data.push (colors[highestDensity].w3c.hex);
          data.push (colors[highestDensity].density);
        }
      }

      console.log (JSON.stringify(data));

      callback(JSON.stringify(data));
  }); 
}

