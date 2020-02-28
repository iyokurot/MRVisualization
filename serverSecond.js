const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();
const { Pool } = require("pg");
//postgres
const pool = new Pool({
  connectionString: "postgres://postgres:kayopile@localhost:5432/reserch"
});
//MySQL
const mysql = require("mysql");
const mysqlconnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "axisdata",
  password: "kayopile"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", function(req, res, next) {
  res.send("express open");
});
app.get("/topics", function(req, res, next) {
  //res.json("test user");
  var datas = {
    target: [
      {
        id: 0,
        name: "person1",
        topic: "itoyuNineAxis",
        head: 0,
        pitch: 0,
        roll: 0
      },
      {
        id: 1,
        name: "dummy1",
        topic: "dummyTopic",
        head: 0,
        pitch: 0,
        roll: 0
      },
      {
        id: 2,
        name: "dummy2",
        topic: "dummyTopic2",
        head: 0,
        pitch: 0,
        roll: 0
      }
    ]
  };
  res.json(datas);
});

app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
