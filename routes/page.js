var express = require("express"),
  router = express.Router();

router.get("/signup", function(req, res, next) {
  if (req.accepts("html")) {
    res.render("signup");
  } else {
    res.json({
      message: "This is a signup page"
    });
  }
});

router.get("/login", function(req, res, next) {
  if (req.accepts("html")) {
    res.render("login");
  } else {
    res.json({
      message: "This is a login page"
    });
  }
});

router.get("/config", function(req, res, next) {
  if (req.accepts("html")) {
    res.render("config");
  } else {
    res.json({
      message: "This is your config page"
    });
  }
});

router.get("/logout", function(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
