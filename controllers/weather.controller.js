const OpenWeatherMapHelper = require("openweathermap-node");
var config = require('../Config');

const helper = new OpenWeatherMapHelper({
  APPID: config.weatherAppID,
  units: "metric"
});


  module.exports.getWeather = function(req, res, next) {
    helper.getCurrentWeatherByGeoCoordinates(req.body.lat, req.body.long, (err, currentWeather) => {
          if (err) {
            console.log(err);
          } else {
            const weatherAndTempreature = "The weather in " + currentWeather.name + " is " + currentWeather.weather[0].description + " and the tempreature is " + Math.ceil(currentWeather.main.temp-272.15) + "°C";
            return res.status(200).json({
                    err: null,
                    msg: 'Weather succesfully retrived.',
                    data: weatherAndTempreature,
                  });
          }
        });
  };
