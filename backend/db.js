// backend/db.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Create a connection pool to handle multiple simultaneous connections safely
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lawyer_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                excerpt TEXT,
                content LONGTEXT,
                author VARCHAR(255),
                image LONGTEXT
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                post_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'pending',
                reply TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS site_settings (
                id INT PRIMARY KEY CHECK (id = 1),
                lawyer_name VARCHAR(255) DEFAULT '',
                header_bio TEXT,
                lawyer_bio TEXT,
                lawyer_image LONGTEXT,
                author_name VARCHAR(255) DEFAULT '',
                author_bio TEXT,
                author_image LONGTEXT,
                services_json LONGTEXT,
                testimonials_json LONGTEXT,
                admin_username VARCHAR(255) DEFAULT 'admin',
                admin_password VARCHAR(255)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(50),
                subject VARCHAR(255),
                content TEXT NOT NULL,
                is_read TINYINT(1) DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Initialize default admin and settings if table is empty
        const [rows] = await pool.query('SELECT * FROM site_settings WHERE id = 1');
        if (rows.length === 0) {
            const defaultHashedPassword = bcrypt.hashSync("password123", 10);
            await pool.query(
                `INSERT INTO site_settings (id, admin_username, admin_password, services_json, testimonials_json) 
                 VALUES (1, 'admin', ?, '[]', '[]')`,
                [defaultHashedPassword]
            );
            console.log("Database initialized with default settings and admin account.");
        }

    } catch (error) {
        console.error("Database initialization error:", error);
    }
}

initDB();

module.exports = pool;