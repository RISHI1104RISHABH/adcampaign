const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// REGISTER
app.post("/register", (req,res)=>{
  const {name,email,password}=req.body;
  db.query("INSERT INTO users (name,email,password) VALUES (?,?,?)",
  [name,email,password],
  err=>{
    if(err) return res.status(400).send("User exists");
    res.send("Registered");
  });
});

// LOGIN
app.post("/login",(req,res)=>{
  const {email,password}=req.body;
  db.query("SELECT * FROM users WHERE email=? AND password=?",
  [email,password],
  (err,result)=>{
    if(result.length>0) res.json(result[0]);
    else res.status(401).send("Invalid");
  });
});

// GET campaigns
app.get("/campaigns/:id",(req,res)=>{
  db.query("SELECT * FROM campaigns WHERE user_id=?",
  [req.params.id],
  (err,data)=>res.json(data));
});

// CREATE
app.post("/campaigns",(req,res)=>{
  const {name,budget,status,user_id}=req.body;
  db.query("INSERT INTO campaigns (name,budget,status,user_id) VALUES (?,?,?,?)",
  [name,budget,status,user_id],
  ()=>res.send("Created"));
});

// DELETE
app.delete("/campaigns/:id",(req,res)=>{
  db.query("DELETE FROM campaigns WHERE id=?",[req.params.id],
  ()=>res.send("Deleted"));
});

// UPDATE STATUS
app.put("/campaigns/:id",(req,res)=>{
  db.query("UPDATE campaigns SET status=? WHERE id=?",
  [req.body.status, req.params.id],
  ()=>res.send("Updated"));
});

app.listen(5000,()=>console.log("Server running"));