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

db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
                                                 id INTEGER PRIMARY KEY CHECK (id = 1),
        lawyer_name TEXT DEFAULT '',
        lawyer_bio TEXT DEFAULT '',
        lawyer_image TEXT,
        author_name TEXT DEFAULT '',
        author_bio TEXT DEFAULT '',
        author_image TEXT,
        services_json TEXT DEFAULT '[]',
        testimonials_json TEXT DEFAULT '[]',
        admin_username TEXT DEFAULT 'admin',
        admin_password TEXT DEFAULT 'password123'
        )
`);

try {
    db.prepare("INSERT OR IGNORE INTO site_settings (id) VALUES (1)").run();
} catch (error) {
    console.error("Settings init error:", error);
}

// Auto-Migration for Credentials and Author Profile
try {
    db.prepare("ALTER TABLE site_settings ADD COLUMN admin_username TEXT DEFAULT 'admin'").run();
    db.prepare("ALTER TABLE site_settings ADD COLUMN admin_password TEXT DEFAULT 'password123'").run();
} catch (error) { /* Columns exist */ }

try {
    db.prepare("ALTER TABLE site_settings ADD COLUMN author_name TEXT DEFAULT ''").run();
    db.prepare("ALTER TABLE site_settings ADD COLUMN author_bio TEXT DEFAULT ''").run();
    db.prepare("ALTER TABLE site_settings ADD COLUMN author_image TEXT").run();
    console.log("Migration: Added author profile to site_settings.");
} catch (error) { /* Columns exist */ }

module.exports = db;