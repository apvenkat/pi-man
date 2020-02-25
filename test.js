const Gpio = require("onoff").Gpio;
var pin = 4
const led = new Gpio(pin, "out");
  led.writeSync(0);
