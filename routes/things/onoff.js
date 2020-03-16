var express = require("express");
var router = express.Router();
const Gpio = require("onoff").Gpio;

router.get("/:thingID/properties/on", function(req, res) {
  var pin = req.params.thingID.slice(5);
  const led = new Gpio(pin, "out");
  led.read((err, value) => {
    // Asynchronous read
    if (err) {
      throw err;
    }

    res.json({ on: value === 0 ? false : true });
  });
});

router.put("/:thingID/properties/on", function(req, res) {
  let value = req.body.on;
  var pin = req.params.thingID.slice(5);
  const led = new Gpio(pin, "out");
  led.write(value === true ? 1 : 0);
  res.json({ on: value });
  switchOnOff(value);
});

function switchOnOff(data) {
  console.log("change detected -" + data);
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = router;
