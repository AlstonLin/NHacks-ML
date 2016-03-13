var http = require('http');
var CLARIFAI_HOST = "http://api.clarifai.com";
var CLARIFAI_COLOR_PATH = "/v1/color/";
var CLARIFAI_ACCESS_TOKEN = "eHXOOi5GS6bjEKICqHuKz5Rm3lQUIO";
module.exports = {
  train : function(url, result, callback){
  },
  predict : function(url, callback){
    getClarifaiData(url, function(response){

      
      callback(response);
      
    }); 
  }
};

function getClarifaiData(url, callback) {
  http.get(CLARIFAI_HOST + CLARIFAI_COLOR_PATH + "?access_token=" + CLARIFAI_ACCESS_TOKEN + "&url=" + url, function(response){
    JSON.stringify (response);

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

      console.log (data);

      callback(JSON.stringify(data));
  }); 
}
