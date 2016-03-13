var http = require('http');
var CLARIFAI_HOST = "http://api.clarifai.com";
var CLARIFAI_COLOR_PATH = "/v1/color/";
var CLARIFAI_ACCESS_TOKEN = "eHXOOi5GS6bjEKICqHuKz5Rm3lQUIO";
module.exports = {
  train : function(url, result, callback){
  },
  predict : function(url, callback){
    getClarifaiData(url, function(response){
      console.log("TEMP: " + response);
      console.log("STATUS: " + response["status_code"]);
      var colors = response["results"]["colors"];
      var data = {};
      if (colors.length == 1){
      } else if (colors.length == 2){
      } else {
        for (var i = 0; i < 3; i++){
          var color = colors[i];
          data[color["hex"]] = color["density"]
        }
        callback(JSON.stringify(data));
      }
    }); 
  }
};

function getClarifaiData(url, callback) {
  http.get(CLARIFAI_HOST + CLARIFAI_COLOR_PATH + "?access_token=" + CLARIFAI_ACCESS_TOKEN + "&url=" + url, callback); 
}
