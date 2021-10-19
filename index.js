const express = require("express");
var mysql = require("mysql");
var cors = require("cors");
const app = express();
require("dotenv").config()
var bodyParser = require("body-parser");


const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
app.use(express.static('public'));

// Setup Stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// This is the list of items we are selling
// This will most likely come from a database or JSON file
const storeItems = new Map([
  [1, { priceInCents: 2806, name: "Amount" }]
])

var con = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6444324",
  password: "9CeZFuIfe7",
  database: "sql6444324",
});

con.connect(function (err) {
  if (err) throw err;
  console.log('app initialized');
  console.log("Connected!");
  try {
    var sql = "CREATE TABLE users (name VARCHAR(255), value VARCHAR(255))";
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
   
    var sqlformone = "CREATE TABLE userformOne (name VARCHAR(255), value VARCHAR(255))";
    con.query(sqlformone, function (err, result) {
      console.log("Table created");
    });

    var sqlformoneinsertrow1 = `INSERT INTO userformOne (name, value) VALUES ('item1', '0')`;
    con.query(sqlformoneinsertrow1, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });

    var sqlformoneinsertrow2 = `INSERT INTO userformOne (name, value) VALUES ('item2', '0')`;
    con.query(sqlformoneinsertrow2, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });

    var sqlformoneinsertrow3 = `INSERT INTO userformOne (name, value) VALUES ('item3', '0')`;
    con.query(sqlformoneinsertrow3, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });

    var sqlformoneinsertrow4 = `INSERT INTO userformOne (name, value) VALUES ('item4', '0')`;
    con.query(sqlformoneinsertrow4, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });

    var sqlformoneinsertrow5 = `INSERT INTO userformOne (name, value) VALUES ('item5', '0')`;
    con.query(sqlformoneinsertrow5, function (err, result) {
      if (err) throw err;
      console.log("record initialized");
    });
  } catch (error) {
    console.log("db exist");
  }
});

app.get("/", (req, res) => {
  con.query("SHOW TABLES FROM `sql6444324`", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      con.query("SELECT * FROM users", function (err, resultfinal, fields) {
        if (err) throw err;
        console.log(resultfinal);
        res.send(resultfinal);
      });
    } else {
      res.send([]);
    }
  });
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    // Create a checkout session with Stripe
    console.log(req.body);
    const storeItem = storeItems.get(1)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // For each item use the id to get it's information
      // Take that information and convert it to Stripe's format
      line_items: [
         {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: req.body.itemquantity,
        }
      ]
      ,
      mode: "payment",
      // Set a success and cancel URL we will send customers to
      // These must be full URLs
      // In the next section we will setup CLIENT_URL
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })

    console.log(session.url)
    res.json({ url: session.url })
  } catch (e) {
    // If there is an error send it to the client
    res.status(500).json({ error: e.message })
  }
})

app.get("/formone", (req, res) => {
  con.query("SHOW TABLES FROM `sql6444324`", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      con.query("SELECT * FROM userformOne", function (err, resultfinal, fields) {
        if (err) throw err;
        console.log(resultfinal);
        res.send(resultfinal);
      });
    } else {
      res.send([]);
    }
  });
});

app.post("/", async (req, res) => {
  if (req.body.itemone) {
    let sqlupdate = `UPDATE users SET value = '${req.body.itemone}' WHERE name = 'item1'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 1 updated");
    });
  }

  if (req.body.itemtwo) {
    let sqlupdate = `UPDATE users SET value = '${req.body.itemtwo}' WHERE name = 'item2'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 2 updated");
    });
  }

  if (req.body.itemthree) {
    let sqlupdate = `UPDATE users SET value = '${req.body.itemthree}' WHERE name = 'item3'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 3 updated");
    });
  }

  if (req.body.itemfour) {
    let sqlupdate = `UPDATE users SET value = '${req.body.itemfour}' WHERE name = 'item4'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 4 updated");
    });
  }

  if (req.body.itemfive) {
    let sqlupdate = `UPDATE users SET value = '${req.body.itemfive}' WHERE name = 'item5'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 5 updated");
    });
  }

  res.send("Hello World! post");
});

app.post("/formone", async (req, res) => {
  if (req.body.itemone) {
    let sqlupdate = `UPDATE userformOne SET value = '${req.body.itemone}' WHERE name = 'item1'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 1 updated");
    });
  }

  if (req.body.itemtwo) {
    let sqlupdate = `UPDATE userformOne SET value = '${req.body.itemtwo}' WHERE name = 'item2'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 2 updated");
    });
  }

  if (req.body.itemthree) {
    let sqlupdate = `UPDATE userformOne SET value = '${req.body.itemthree}' WHERE name = 'item3'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 3 updated");
    });
  }

  if (req.body.itemfour) {
    let sqlupdate = `UPDATE userformOne SET value = '${req.body.itemfour}' WHERE name = 'item4'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 4 updated");
    });
  }

  if (req.body.itemfive) {
    let sqlupdate = `UPDATE userformOne SET value = '${req.body.itemfive}' WHERE name = 'item5'`;

    await con.query(sqlupdate, function (err, result) {
      if (err) throw err;
      console.log("record 5 updated");
    });
  }

  res.send("posted on  form");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
