var pirPlugin = require('../plugins/pir');
// dhtPlugin = require('./plugins/internal/DHT22SensorPlugin');
var express = require('express'),
   router = express.Router()


router.get('/true',function (req, res) {
   
    pirPlugin.start({'simulate': true, 'frequency': 2000});
    res.sendStatus(200)
});

router.get('/false',function (req, res) {
   
    pirPlugin.stop({'simulate': true, 'frequency': 2000});
    res.sendStatus(200)
});


module.exports = router;