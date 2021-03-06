var http = require('http');
module.exports.commands = ["w", "weather"];

module.exports.run = function(remainder, parts, reply, command, from, to, text, raw) {
  http.get('http://api.openweathermap.org/data/2.5/weather?q=' + remainder + '&units=imperial', function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      var ranks;
      try {
        weatherData = JSON.parse(data.toString());
      } catch(e) {
        return reply("Error handling response");
      }

      if ( weatherData.cod == 200 ){
        reply(weatherData.name + ' | ' + weatherData.main.temp + '°F, '  + weatherData.weather[0].description + ' | Lo: ' + weatherData.main.temp_min + "°F, Hi: " + weatherData.main.temp_max + '°F');
      }else{
        reply("Could not locate: " + remainder);
      }
    });
  });
};
