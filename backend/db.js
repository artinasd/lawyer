// backend/db.js
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
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
        header_bio TEXT DEFAULT '',
        lawyer_bio TEXT DEFAULT '',
        lawyer_image TEXT,
        author_name TEXT DEFAULT '',
        author_bio TEXT DEFAULT '',
        author_image TEXT,
        services_json TEXT DEFAULT '[]',
        testimonials_json TEXT DEFAULT '[]',
        admin_username TEXT DEFAULT 'admin',
        admin_password TEXT
        )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        subject TEXT,
        content TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Initialization with hashed default password
try {
    const defaultHashedPassword = bcrypt.hashSync("password123", 10);
    const stmt = db.prepare("INSERT OR IGNORE INTO site_settings (id, admin_username, admin_password) VALUES (1, 'admin', ?)");
    stmt.run(defaultHashedPassword);
} catch (error) {
    console.error("Settings init error:", error);
}

// Auto-Migrations
try {
    db.prepare("ALTER TABLE site_settings ADD COLUMN admin_username TEXT DEFAULT 'admin'").run();
    const defaultHashed = bcrypt.hashSync("password123", 10);
    db.prepare(`ALTER TABLE site_settings ADD COLUMN admin_password TEXT DEFAULT '${defaultHashed}'`).run();
} catch (error) { /* Columns exist */ }

try {
    db.prepare("ALTER TABLE site_settings ADD COLUMN author_name TEXT DEFAULT ''").run();
    db.prepare("ALTER TABLE site_settings ADD COLUMN author_bio TEXT DEFAULT ''").run();
    db.prepare("ALTER TABLE site_settings ADD COLUMN author_image TEXT").run();
} catch (error) { /* Columns exist */ }

try {
    db.prepare("ALTER TABLE site_settings ADD COLUMN header_bio TEXT DEFAULT ''").run();
} catch (error) { /* Column exists */ }

// IMPORTANT: Migration to hash plain-text passwords on existing databases
try {
    const settings = db.prepare("SELECT admin_password FROM site_settings WHERE id = 1").get();
    if (settings && settings.admin_password && !settings.admin_password.startsWith('$2a$')) {
        const hashed = bcrypt.hashSync(settings.admin_password, 10);
        db.prepare("UPDATE site_settings SET admin_password = ? WHERE id = 1").run(hashed);
        console.log("Migration: Hashed existing plain-text password for security.");
    }
} catch (error) {
    console.error("Password hash migration error:", error);
}

module.exports = db;