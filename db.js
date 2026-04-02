const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rishabh@1011", // 🔴 put your MySQL password here
  database: "ads_manager"
});

db.connect(err => {
  if (err) {
    console.log("DB CONNECTION ERROR:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

module.exports = db;