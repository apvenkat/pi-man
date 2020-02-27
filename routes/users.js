var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3");
var bcrypt = require("bcrypt");

router.use(require("cookie-parser")());
var db = new sqlite3.Database("db/sqlitedb.db");
const jwt = require("jsonwebtoken");
var secret = "This is the secret for signing tokens";
//Add Users
router.post("/add", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, 10, function(err, hash) {
    // Store hash in database
    var sql = `insert into login (name,email,password)
        VALUES
        (?,?,?);`;

    var values = [name, email, hash];

    db.serialize(function() {
      db.run(sql, values, function(err) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else res.send();
      });
    });
  });
});

//List Users
router.get("/list", function(req, res) {
  processData(res, "SELECT * FROM login");
});

function processData(res, sql) {
  db.serialize(function() {
    db.all(sql, function(err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else sendData(res, rows, err);
    });
  });
}

function sendData(res, data, err) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (data[0]) res.send(data);
  else {
    res.status(404).send("No Users Found");
  }
}

//Login User

router.post("/login", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var email = req.body.email;
  var password = req.body.password;
  db.all("SELECT * FROM login WHERE email = ?", [email], function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.json({
        status: false,
        message: "there are some error with query"
      });
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function(err, ress) {
          if (!ress) {
            res.json({
              status: false,
              message: "Email and password does not match"
            });
          } else {
            var token = jwt.sign({ email: req.body.email }, secret);
            res.cookie("token", token);
            res.redirect("/dashboard");
          }
        });
      } else {
        res.json({
          status: false,
          message: "Email does not exits"
        });
      }
    }
  });
});

router.get("/logout", function(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
