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
//MQTT
const mqtt = require("mqtt");
const mqttclient = mqtt.connect({
  host: "localhost",
  port: 1883,
  clientId: "http.subscriber"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/client/build")));

///MQTT
mqttclient.subscribe("itoyuNineAxis");
mqttclient.on("message", function(topic, message) {
  const messages = message.toString();

  console.log(messages);
  //message=>jsonへ
  var obj = new Function("return " + messages)();
  //var json = JSON.parse(obj);
  //console.log(json);
  //MySQLtest
  /*
  mysqlconnection.query(
    "insert into axisdata (datetime,ax,ay,az,lx,ly,lz,gx,gy,gz) values(?,?,?,?,?,?,?,?,?,?)",
    [
      20191115,
      obj.ax,
      obj.ay,
      obj.az,
      obj.lx,
      obj.ly,
      obj.lz,
      obj.gx,
      obj.gy,
      obj.gz
    ],
    function(error, results, fields) {
      if (error) throw error;
      //console.log(results);
    }
  );
  */
});

app.get("/", function(req, res, next) {
  res.send("express open");
});
app.get("/users", function(req, res, next) {
  //res.json("test user");
  var user = {
    name: "name",
    text: "test"
  };
  res.json(user);
});

app.get("/sensorData", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM axisdata order by datetime desc limit 8"
    );
    const results = { results: result ? result.rows : null };
    client.release();
    var json = { target: results.results };

    res.send(json);
  } catch (err) {
    console.log(err);
    res.send("");
  }
});

app.get("/tests", (req, res) => {
  var datas = {
    target: [
      {
        datetime: "yyyy:MM/DD" + Math.random(),
        ax: Math.random() * 10,
        ay: Math.random() * 10,
        az: Math.random() * 10,
        Lx: Math.random() / 10,
        Ly: Math.random() / 10,
        Lz: Math.random() / 10,
        gx: Math.random(),
        gy: Math.random(),
        gz: Math.random()
      },
      {
        datetime: "yyyy:MM/DD" + Math.random(),
        ax: Math.random() * 10,
        ay: Math.random() * 10,
        az: Math.random() * 10,
        Lx: Math.random() / 10,
        Ly: Math.random() / 10,
        Lz: Math.random() / 10,
        gx: Math.random(),
        gy: Math.random(),
        gz: Math.random()
      }
    ]
  };
  res.send(datas);
});
app.post("/postTest", async (req, res) => {
  const axisdata = JSON.parse(req.body.axis);
  try {
    const client = await pool.connect();
    //const result = await client.query("SELECT * FROM axisdata");
    const result = await client.query(
      "INSERT INTO axisdata VALUES(TO_TIMESTAMP($1,'YYYY/MM/DD HH24:MI:SS:US'),$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        axisdata.datetime,
        axisdata.ax,
        axisdata.ay,
        axisdata.az,
        axisdata.Lx,
        axisdata.Ly,
        axisdata.Lz,
        axisdata.gx,
        axisdata.gy,
        axisdata.gz
      ]
    );
    client.release();
    res.send("");
  } catch (err) {
    console.log(err);
    res.send("");
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
