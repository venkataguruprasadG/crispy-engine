// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./database');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // Send the index.html file
});

// Registration route
app.post('/register', async (req, res) => {
    console.log('Registration request received:', req.body);
  try {
    const { fullName, username, password, confirmPassword, rememberMe } = req.body;

    // Basic validation
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [rows, fields] = await pool.execute(
      'INSERT INTO users (fullName, username, password, rememberMe) VALUES (?, ?, ?, ?)',
      [fullName, username, hashedPassword, rememberMe]
    );

    console.log('User registered successfully');
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// Login route
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const [rows, fields] = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
  
      if (rows.length > 0) {
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          res.send('User logged in successfully');
        } else {
          res.status(401).send('Invalid username or password');
        }
      } else {
        res.status(401).send('Invalid username or password');
      }
    } catch (error) {
      res.status(500).send('Error logging in user');
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});