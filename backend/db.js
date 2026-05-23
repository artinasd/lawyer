// backend/db.js
const Database = require('better-sqlite3');
const db = new Database('lawyer.db', { verbose: console.log });

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT
  )
`);

module.exports = db;
