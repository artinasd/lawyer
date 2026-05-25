// backend/db.js
const Database = require('better-sqlite3');
const db = new Database('lawyer.db', { verbose: console.log });

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         title TEXT NOT NULL,
                                         excerpt TEXT,
                                         content TEXT,
                                         author TEXT,
                                         image TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT DEFAULT 'pending', 
        reply TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    )
`);

// Auto-Migration: If the comments table already exists from the previous step,
// this will safely add the new columns without deleting your data.
try {
    db.prepare("ALTER TABLE comments ADD COLUMN status TEXT DEFAULT 'pending'").run();
    db.prepare("ALTER TABLE comments ADD COLUMN reply TEXT").run();
    console.log("Migration: Added status and reply columns to comments.");
} catch (error) {
    // Columns likely already exist, which is perfectly fine.
}

module.exports = db;