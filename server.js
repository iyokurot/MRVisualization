const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgres://postgres:kayopile@localhost:5432/reserch"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/client/build")));

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
  /*
  var datas = [];
  for (var i = 0; i < 7; i++) {
    const data = {
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
    };
    datas.push(data);
  }
  */
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
