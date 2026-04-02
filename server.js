const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


// ================= AUTH =================

// REGISTER
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err) => {
      if (err) {
        console.log("REGISTER ERROR:", err);

        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists" });
        }

        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Registered successfully" });
    }
  );
});


// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});


// ================= CAMPAIGNS =================

// GET campaigns
app.get("/campaigns/:userId", (req, res) => {
  db.query(
    "SELECT * FROM campaigns WHERE user_id=?",
    [req.params.userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// CREATE campaign
app.post("/campaigns", (req, res) => {
  const { name, page, budget, status, user_id } = req.body;

  db.query(
    "INSERT INTO campaigns (name, page, budget, status, user_id) VALUES (?, ?, ?, ?, ?)",
    [name, page, budget, status, user_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Campaign created" });
    }
  );
});

// DELETE campaign
app.delete("/campaigns/:id", (req, res) => {
  db.query("DELETE FROM campaigns WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});