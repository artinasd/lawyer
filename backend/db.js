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

// NEW: Global Site Settings Table
db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
                                                 id INTEGER PRIMARY KEY CHECK (id = 1),
        lawyer_name TEXT DEFAULT '',
        lawyer_bio TEXT DEFAULT '',
        lawyer_image TEXT,
        services_json TEXT DEFAULT '[]',
        testimonials_json TEXT DEFAULT '[]'
        )
`);

// Seed initial settings row if it doesn't exist
try {
    db.prepare("INSERT OR IGNORE INTO site_settings (id) VALUES (1)").run();
} catch (error) {
    console.error("Settings init error:", error);
}

module.exports = db;