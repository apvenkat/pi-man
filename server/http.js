var express = require("express");
var sensorRoutes = require("./../routes/sensors");
var digital = require("../routes/digital-simulate");
var analog = require("../routes/analog-simulate");
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
app.use("/", pages);
app.use("/things", require("./../routes/api"));
app.use("/things", require("./../routes/properties"));
app.use("/users", require("./../routes/users"));
// app.use("/pi/sensors", sensorRoutes);
// app.use("/pi/sensors/pir/simulate", digital);
// app.use("/pi/sensors/temperature/simulate", analog);
app.get("/", function(req, res) {
  res.send("This is the WoT-Pi!");
});

module.exports = app;
