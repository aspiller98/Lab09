const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/dd2cd4dd1b7014b4dc0135d4890fc31a/" +
    longitude +
    "," +
    latitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " There is " +
          body.currently.temperature +
          " degrees celcius out. The high today is " +
          body.daily.data[0].temperatureHigh +
          " degrees celcius with a low of " +
          body.daily.data[0].temperatureLow +
          " degrees celcius. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
