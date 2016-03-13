var synaptic = require('synaptic');
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
var http = require('http');
var CLARIFAI_HOST = "http://api.clarifai.com";
var CLARIFAI_COLOR_PATH = "/v1/color/";
var CLARIFAI_ACCESS_TOKEN = "eHXOOi5GS6bjEKICqHuKz5Rm3lQUIO";

// MACHINE LEARNING
function Perceptron(input, hidden, output){
  var inputLayer = new Layer(input);
  var hiddenLayer = new Layer(hidden);
  var outputLayer = new Layer(output);
  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);
  this.set({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });
}

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;
var perceptron = new Perceptron(6, 4, 1);
var trainer = new Trainer(perceptron);
var trainingSet = [];
// EXPORTS
module.exports = {
  // Note: actually just adds data
  train : function(url, result, callback){
    getCalifaiData(url, function(data){
      trainingSet.push({
        input: data,
        output: result
      });
    });
    callback();
  },
  predict : function(url, callback){
    getClarifaiData(url, function(data){
      callback(perceptron.activate(data));
    }); 
  },
  executeTraining : function(callback){
    trainer.train(trainingSet, {
      rate: .1,
      iterations: 20000,
      error: .01,
      shuffle: true,
      log: 1000,
      cost: Trainer.cost.CROSS_ENTROPY
    });
    callback();
  }
};

// Stuff TODO
function saveParams(params){
}

// SCRAPING
function getClarifaiData(url, callback) {
  http.get(CLARIFAI_HOST + CLARIFAI_COLOR_PATH + "?access_token=" + CLARIFAI_ACCESS_TOKEN + "&url=" + url, function(response){
    // TEMP
    console.log("KEYS: " + JSON.stringify(Object.keys(response)));
    callback([1,1,1,1,1,1]);
  }); 
}

