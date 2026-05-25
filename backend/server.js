// backend/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const SECRET_KEY = "my_ultra_secure_secret";

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// 1. LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    try {
        const settings = db.prepare("SELECT admin_username, admin_password FROM site_settings WHERE id = 1").get();
        const validUser = settings ? settings.admin_username : "admin";
        const validPass = settings ? settings.admin_password : "password123";

        if (username === validUser && password === validPass) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Database error" });
    }
});

// 2. AUTH MIDDLEWARE
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) return res.status(403).json({ message: "No token" });

    const bearerToken = token.split(' ')[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        next();
    });
};

// 3. GET ALL POSTS
app.get('/api/posts', (req, res) => {
    try {
        const posts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// 4. ADD POST
app.post('/api/posts', authenticate, (req, res) => {
    const { title, excerpt, content, author, image } = req.body;
    try {
        const stmt = db.prepare("INSERT INTO posts (title, excerpt, content, author, image) VALUES (?, ?, ?, ?, ?)");
        stmt.run(title.trim(), excerpt?.trim() || null, content.trim(), author?.trim() || null, image || null);
        res.status(201).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: "Failed to save post." });
    }
});

// 5. GET APPROVED COMMENTS
app.get('/api/posts/:id/comments', (req, res) => {
    try {
        const comments = db.prepare("SELECT * FROM comments WHERE post_id = ? AND status = 'approved' ORDER BY created_at DESC").all(req.params.id);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
});

// 6. ADD COMMENT
app.post('/api/posts/:id/comments', (req, res) => {
    const { name, content } = req.body;
    try {
        const stmt = db.prepare("INSERT INTO comments (post_id, name, content) VALUES (?, ?, ?)");
        stmt.run(req.params.id, name.trim(), content.trim());
        res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to save comment." });
    }
});

// 7. GET ALL COMMENTS
app.get('/api/admin/comments', authenticate, (req, res) => {
    try {
        const comments = db.prepare(`SELECT c.*, p.title as post_title FROM comments c JOIN posts p ON c.post_id = p.id ORDER BY c.created_at DESC`).all();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin comments" });
    }
});

// 8. UPDATE COMMENT STATUS
app.put('/api/admin/comments/:id', authenticate, (req, res) => {
    try {
        const stmt = db.prepare("UPDATE comments SET status = ?, reply = ? WHERE id = ?");
        stmt.run(req.body.status, req.body.reply || null, req.params.id);
        res.json({ message: "Comment updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating comment" });
    }
});

// 9. DELETE POST
app.delete('/api/posts/:id', authenticate, (req, res) => {
    try {
        db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting" });
    }
});

// 10. EDIT POST
app.put('/api/posts/:id', authenticate, (req, res) => {
    const { title, excerpt, content, author, image } = req.body;
    try {
        db.prepare("UPDATE posts SET title = ?, excerpt = ?, content = ?, author = ?, image = ? WHERE id = ?")
            .run(title.trim(), excerpt?.trim() || null, content.trim(), author?.trim() || null, image || null, req.params.id);
        res.json({ message: "Updated" });
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
});

// 11. GET GLOBAL SETTINGS
app.get('/api/settings', (req, res) => {
    try {
        // Fetching author_* fields as well
        const settings = db.prepare("SELECT id, lawyer_name, lawyer_bio, lawyer_image, author_name, author_bio, author_image, services_json, testimonials_json, admin_username FROM site_settings WHERE id = 1").get();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching settings" });
    }
});

// 12. UPDATE GLOBAL SETTINGS
app.put('/api/settings', authenticate, (req, res) => {
    const { lawyer_name, lawyer_bio, lawyer_image, author_name, author_bio, author_image, services_json, testimonials_json } = req.body;
    try {
        const stmt = db.prepare(`
            UPDATE site_settings
            SET lawyer_name = ?, lawyer_bio = ?, lawyer_image = ?,
                author_name = ?, author_bio = ?, author_image = ?,
                services_json = ?, testimonials_json = ?
            WHERE id = 1
        `);
        stmt.run(
            lawyer_name || null,
            lawyer_bio || null,
            lawyer_image || null,
            author_name || null,
            author_bio || null,
            author_image || null,
            services_json || '[]',
            testimonials_json || '[]'
        );
        res.json({ message: "Settings saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save settings" });
    }
});

// 13. UPDATE ADMIN CREDENTIALS
app.put('/api/settings/credentials', authenticate, (req, res) => {
    const { currentPassword, newUsername, newPassword } = req.body;
    try {
        const settings = db.prepare("SELECT admin_password FROM site_settings WHERE id = 1").get();
        if (settings.admin_password !== currentPassword) {
            return res.status(401).json({ message: "رمز عبور فعلی اشتباه است." });
        }
        db.prepare("UPDATE site_settings SET admin_username = ?, admin_password = ? WHERE id = 1").run(newUsername.trim(), newPassword);
        res.json({ message: "Credentials updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating credentials" });
    }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));