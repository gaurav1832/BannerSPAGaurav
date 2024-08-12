require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
