const Gpio = require("onoff").Gpio;
var pin = 4
const led = new Gpio(pin, "out");
led.write(1);  
led.read((err, value) => { // Asynchronous read
    if (err) {
      throw err;
    } 
console.log(value)
})



