var express = require("express");
var router = express.Router();
const Gpio = require("onoff").Gpio;

router.get("/:thingID/properties/on", function(req, res) {
  res.send(JSON.stringify(switchOnOff()));
});
//   //   request(thingsURL, { json: true }, (err, res, webthings) => {
//   //     if (err) {
//   //       return console.log(err);
//   //     }
//   var pin = req.params.thingID.slice(-2);
//   //     // const led = new Gpio(pin, "out");
//   //     // led.writeSync(1);
//   //   });
//   //   res.json(pin);
//   res.send("pin number is " + pin);

router.put("/:thingID/properties/on", function(req, res) {
  let value = req.body.on;
  var pin = req.params.thingID.slice(-2);
  const led = new Gpio(pin, "out");
  led.writeSync(value === true ? 1 : 0);
  res.json({ on: value });
  switchOnOff(value);
});

router.get("/:thingID/properties/value", function(req, res) {
  var temperature = randomInt(0, 20);
  res.json({ temperature: temperature });
});

//GPIO Low

// router.put("/api/off/:id", function(req, res) {
//   request(APIEndpoint, { json: true }, (err, res, gpiodata) => {
//     if (err) {
//       return console.log(err);
//     }
//     const led = new Gpio(gpiodata[req.params.id].pin, "out");
//     led.writeSync(0);
//   });
//   res.sendStatus(200);
// });

function switchOnOff(data) {
  console.log(data);
  var status = { on: data };

  return status;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = router;
