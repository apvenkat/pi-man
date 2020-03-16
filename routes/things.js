var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3");
router.use(require("cookie-parser")());
const auth = require("../auth/auth");
const request = require("request");
var db = new sqlite3.Database("db/sqlitedb.db");
// // const Gpio = require("onoff").Gpio;
// var APIEndpoint = "http://localhost:4000/api/";

//add a gpio device
router.post("/", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var id = req.body.id;
  var pin = req.body.pin;
  var thingID = "gpio-" + pin + "";
  var name = req.body.name;
  var type = req.body.type;
  switch (type) {
    case "onoff":
      var thingID = "gpio-" + pin + "";
      var description = JSON.stringify({
        "@context": "http://w3c.github.io/wot/w3c-wot-td-context.jsonld",
        "@type": "Thing",
        thingID: thingID,
        thingType: type,
        thingURL: "/things/gpio-" + pin + "",
        name: name,
        properties: {
          on: {
            type: type,
            unit: "boolean",
            href: "/things/gpio-" + pin + "/properties/on"
          }
        }
      });
      break;
    case "dht-sensor":
      var thingID = "dht-" + pin + "";
      var description = JSON.stringify({
        "@context": "http://w3c.github.io/wot/w3c-wot-td-context.jsonld",
        "@type": "Thing",
        thingID: thingID,
        thingType: type,
        thingURL: "/things/dht-" + pin + "",
        name: name,
        properties: {
          temperature: {
            type: type,
            unit: "°C",
            href: "/things/dht-" + pin + "/properties/temperature"
          },
          humidity: {
            type: type,
            unit: "%",
            href: "/things/dht-" + pin + "/properties/humidity"
          }
        }
      });
      break;
  }

  var sql = `insert into things (thingID,name,type, description)
        VALUES
        (?,?,?,?);`;

  var values = [thingID, name, type, description];

  db.serialize(function() {
    db.run(sql, values, function(err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send("successfully inserted");
    });
  });
});

router.get("/", auth, function(req, res) {
  if (req.accepts("html")) {
    res.render("dashboard");
  } else {
    db.serialize(function() {
      res.setHeader("Access-Control-Allow-Origin", "*");

      var sql = `select description from  things`;
      var params = [];
      db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        const things = [];
        for (const row of rows) {
          const thing = JSON.parse(row.description);
          thing.id = row.id;
          things.push(thing);
        }
        res.json(things);
      });
    });
  }
});

router.get("/:thingID", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var thing = req.params.thingID;

  var sql = `select description from  things where thingID = ?;`;
  var params = [thing];

  db.serialize(function() {
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      const things = [];
      for (const row of rows) {
        const thing = JSON.parse(row.description);
        thing.id = row.id;
        things.push(thing);
      }
      res.json(things);
    });
  });
});

//Delete Device
router.post("/delete", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var thingID = req.body.thingID;
  if (!thingID) {
    res.status(400).send("Name is mandatory");
  } else {
    var sql = `delete from  things where thingID = ?;`;
    var values = [thingID];

    db.serialize(function() {
      db.run(sql, values, function(err) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else res.send();
      });
    });
  }
});

module.exports = router;
