const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rishabh@1011", // your password
  database: "ads_manager"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

module.exports = db;