dhtPlugin = require('../plugins/DHT22SensorPlugin');
var express = require('express'),
   router = express.Router()

router.get('/true',function (req, res) {
   
    dhtPlugin.start({'simulate': true, 'frequency': 2000});
    res.sendStatus(200)
  
});

router.get('/false',function (req, res) {
   
    dhtPlugin.stop({'simulate': true, 'frequency': 2000});
    res.sendStatus(200)
});


module.exports = router;