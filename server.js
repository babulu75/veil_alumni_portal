const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vinni@02#feb',
  database: 'alumni_portal'
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL!");
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/signup', async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).send("Please fill all fields.");
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).send("DB error");
    if (results.length > 0) return res.status(400).send("User already exists");

    try {
      const hashedPass = await bcrypt.hash(password, 10);
      db.query("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
        [full_name, email, hashedPass],
        (err, results) => {
          if (err) return res.status(500).send("Insert error");
          res.status(200).send("Signup successful");
        }
      );
    } catch (err) {
      res.status(500).send("Password encryption error");
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send("DB error");
    if (results.length === 0) return res.status(401).send("Invalid email");

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Invalid password");

    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      full_name: user.full_name,
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
