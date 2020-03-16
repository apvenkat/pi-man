//DHT-sensor
var express = require("express");
var router = express.Router();
router.get(
  "/:thingID/properties/:value",
  function(req, res) {
    var sensor = require("node-dht-sensor");
    var pin = req.params.thingID.slice(4);
    var dht = req.params.value;
    switch (dht) {
      case "temperature":
        sensor.read(11, pin, function(err, temperature, humidity) {
          if (!err) {
            var temp = temperature;
            res.json({ Temperature: temp + "°C" });
          }
        });
        break;
      case "humidity":
        sensor.read(11, pin, function(err, temperature, humidity) {
          if (!err) {
            var humid = humidity;
            res.json({ Humidity: humid + "%" });
          }
        });
        break;
    }
  }

  // var temperature = randomInt(0, 20);
  // res.json({ temperature: temperature });
);
module.exports = router;
