const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

app.get("/", function(req, res, next) {
  res.send("express open");
});
app.get("/users", function(req, res, next) {
  //res.json("test user");

  var user = {
    name: "name",
    text: "test"
  };
  res.send(user);
});

app.get("/sensorData", (req, res) => {
  var datas = [];
  for (var i = 0; i < 7; i++) {
    var data = {
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
  res.send(datas);

  /*
    var db = req.db;
     var collection = db.get("ACCELERATORS");
     //console.log(collection);
     collection.find({},{},function(e,docs){
         console.log(docs);
         res.send(docs);
         
         //console.log(docs.length)
     });
     */
});

app.get("/tests", (req, res) => {
  var datas = [
    { time: "time", ax: 1, ay: 2, az: 3 },
    { time: "time", ax: 2, ay: 1, az: 2 },
    { time: "time", ax: 3, ay: 3, az: 1 },
    { time: "time", ax: 1, ay: 2, az: 3 }
  ];
  res.send(datas);
});

app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
