// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vinni@02#feb',
  database: 'alumni_portal'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Login Route
app.post('/login', (req, res) => {
  const { employee_id, password } = req.body;

  const query = 'SELECT * FROM users WHERE employee_id = ? AND password = ?';
  db.query(query, [employee_id, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (results.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  });
});

app.post('/signup', (req, res) => {
  const { employee_id, password } = req.body;

  // First check if user exists
  const checkQuery = 'SELECT * FROM users WHERE employee_id = ?';
  db.query(checkQuery, [employee_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (results.length > 0) {
      return res.json({ message: "User already exists" });
    }

    // Insert new user
    const insertQuery = 'INSERT INTO users (employee_id, password) VALUES (?, ?)';
    db.query(insertQuery, [employee_id, password], (err, results) => {
      if (err) return res.status(500).json({ message: "Error creating user" });
      res.json({ message: "Signup successful" });
    });
  });
});

// TODO: Create /signup route

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
