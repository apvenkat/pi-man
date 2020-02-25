var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3");
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
  if (req.body.type == "onoff") {
    var description = JSON.stringify({
      "@context": "http://w3c.github.io/wot/w3c-wot-td-context.jsonld",
      "@type": "Thing",
      thingID: thingID,
      thingURL: "/things/" + id + "",
      name: name,
      properties: {
        on: {
          type: type,
          unit: "boolean",
          href: "/things/" + thingID + "/properties/on"
        }
      }
    });
  } else
    var description = JSON.stringify({
      "@context": "http://w3c.github.io/wot/w3c-wot-td-context.jsonld",
      "@type": "Thing",
      thingID: thingID,
      thingURL: "/things/" + id + "",
      name: name,
      properties: {
        sensor: {
          type: type,
          unit: "value",
          href: "/things/" + thingID + "/properties/value"
        }
      }
    });

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

// function processData(res, sql) {
//   db.serialize(function() {
//     db.all(sql, function(err, rows) {
//       if (err) {
//         console.error(err);
//         res.status(500).send(err);
//       } else sendData(res, rows, err);
//     });
//   });
// }

// function sendData(res, data, err) {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   if (data[0]) {
//     const thing = JSON.parse(row.description);
//     res.json(thing);
//   } else {
//     res.status(404).send("Device not found");
//   }
// }

router.get("/", function(req, res) {
  db.serialize(function() {
    res.setHeader("Access-Control-Allow-Origin", "*");

    var sql = `select description from  things;`;
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
});

router.get("/:id", function(req, res) {
  db.serialize(function() {
    res.setHeader("Access-Control-Allow-Origin", "*");

    var sql =
      "select description from  things where id = " + req.params.id + "";
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
});

//Delete Device
router.post("/delete", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var thingID = req.body.thingID;
  if (!name) {
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
