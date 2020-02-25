var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("db/sqlitedb.db");

// create things table
db.run(
  `CREATE TABLE IF NOT EXISTS 'things' (
    'id'	INTEGER PRIMARY KEY AUTOINCREMENT,
      'thingID'	TEXT UNIQUE,
      'name' TEXT,
      'type' TEXT,
      'description'	TEXT );`,
  function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("Things Table Created");
  }
);

// create login table
db.run(
  `CREATE TABLE IF NOT EXISTS 'login' (
      'id'	INTEGER PRIMARY KEY AUTOINCREMENT,
      'name'	TEXT NOT NULL,
      'email'	TEXT UNIQUE,
      'password' TEXT NOT NULL );`,
  function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("Login Table Created");
  }
);
