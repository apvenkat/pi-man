var express = require('express'),
   router = express.Router(),
  resources = require('./../resources/model');

router.get('/',function (req, res) {
   
        res.json(resources.pi.sensors);
      
});
router.get('/pir',function (req, res) {
   
    res.json(resources.pi.sensors.pir);
  
});

router.get('/temperature',function (req, res) {
   
    res.json(resources.pi.sensors.temperature);
  
});

// router.get('/pir',function (req, res, next) {
//   res.json( resources.pi.sensors.pir);
//   next();
// });
module.exports = router;
