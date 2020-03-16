var express = require("express");
var sensorRoutes = require("./../routes/sensors");

var pages = require("./../routes/page");
const app = express();
var db = require("./../db.js");

//sqlite database creation

var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname + "./../public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route for pages and things
app.use("/", pages);
app.use("/things", require("../routes/things"));
app.use("/users", require("./../routes/users"));
//web things code and routes
app.use("/things", require("../routes/things/onoff"));
app.use("/things", require("../routes/things/dht-sensor"));

app.get("/", function(req, res) {
  if (req.accepts("html")) {
    res.render("login");
  } else {
    res.send("Let's make Web of Things on Rpi");
  }
});

module.exports = app;
