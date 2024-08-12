require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require("url");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const dbUri = process.env.DB_URI;

const connection = mysql.createConnection({
  uri: dbUri,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

app.get("/api/banner", (req, res) => {
  connection.query("SELECT * FROM Banner", (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

app.post("/api/banner/toggle", (req, res) => {
  const { id, visibility } = req.body;
  connection.query(
    "UPDATE Banner SET visibility = ? WHERE id = ?",
    [visibility, id],
    (err, result) => {
      if (err) throw err;
      res.send({ success: true });
    }
  );
});

app.post("/api/banner/update", (req, res) => {
  const { id, title, description, timer, link, offer, startTime } = req.body;

  const updateBannerQuery = `UPDATE Banner SET title = ?, description = ?, timer = ?, link = ?, offer = ?, startTime = ?
            WHERE id = ?`;
  connection.query(
    updateBannerQuery,
    [title, description, timer, link, offer, startTime, id],
    (err, result) => {
      if (err) console.log(err);
      res.send({ success: true });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
