// database.js
const mysql = require('mysql2/promise');

// Replace with your MySQL configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Vasudeva9*',
  database: 'placement_user_details'
});

module.exports = pool;