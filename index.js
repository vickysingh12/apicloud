const express = require("express");
var mysql = require("mysql");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");

const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var con = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6444324",
  password: "9CeZFuIfe7",
  database: "sql6444324",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  try {
    var sql =
      "CREATE TABLE users (name VARCHAR(255), value VARCHAR(255))";
    con.query(sql, function (err, result) {
      console.log("Table created");
    });

    var sqlinsertrow1 = `INSERT INTO users (name, value) VALUES ('item1', '0')`;
    con.query(sqlinsertrow1, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });
    
    var sqlinsertrow2 = `INSERT INTO users (name, value) VALUES ('item2', '0')`;
    con.query(sqlinsertrow2, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });
    
    var sqlinsertrow3 = `INSERT INTO users (name, value) VALUES ('item3', '0')`;
    con.query(sqlinsertrow3, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });
    
    var sqlinsertrow4 = `INSERT INTO users (name, value) VALUES ('item4', '0')`;
    con.query(sqlinsertrow4, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });
    
    var sqlinsertrow5 = `INSERT INTO users (name, value) VALUES ('item5', '0')`;
    con.query(sqlinsertrow5, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });
  } catch (error) {
    console.log("db exist");
  }
});

app.get("/", async (req, res) => {
  await con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    res.send(result);
  });
});

app.get("/del", async (req, res) => {
  await con.query("DROP TABLE users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    res.send('success');
  });
});

app.post("/", async (req, res) => {
  console.log(req.body.itemone);

  if(req.body.itemone) {

      let sqlupdate = `UPDATE users SET value = '${req.body.itemone}' WHERE name = 'item1'`;
    
      await con.query(sqlupdate, function (err, result) {
        if (err) throw err;
        console.log("record 1 updated");
      });
  }

  if(req.body.itemtwo) {

      let sqlupdate = `UPDATE users SET value = '${req.body.itemtwo}' WHERE name = 'item2'`;
    
      await con.query(sqlupdate, function (err, result) {
        if (err) throw err;
        console.log("record 2 updated");
      });
  }
  
  if(req.body.itemthree) {

      let sqlupdate = `UPDATE users SET value = '${req.body.itemthree}' WHERE name = 'item3'`;
    
      await con.query(sqlupdate, function (err, result) {
        if (err) throw err;
        console.log("record 3 updated");
      });
  }
  
  if(req.body.itemfour) {

      let sqlupdate = `UPDATE users SET value = '${req.body.itemfour}' WHERE name = 'item4'`;
    
      await con.query(sqlupdate, function (err, result) {
        if (err) throw err;
        console.log("record 4 updated");
      });
  }
  
  if(req.body.itemfive) {

      let sqlupdate = `UPDATE users SET value = '${req.body.itemfive}' WHERE name = 'item5'`;
    
      await con.query(sqlupdate, function (err, result) {
        if (err) throw err;
        console.log("record 5 updated");
      });
  }

  res.send("Hello World! post");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
