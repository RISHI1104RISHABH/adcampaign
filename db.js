const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "1775224256417",
  user: "root",
  password: "Rishabh@1011", // your password
  database: "ads_manager"
});

db.connect(err => {
  if (err) console.log("DB ERROR:", err);
  else console.log("MySQL Connected ✅");
});

module.exports = db;