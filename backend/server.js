// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db'); // Now exports the MySQL promise pool

const app = express();
const PORT = process.env.PORT || 5000;

// SECURITY FIX: Enforce JWT_SECRET in production to prevent compromises
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY && process.env.NODE_ENV === 'production') {
    console.error("FATAL ERROR: JWT_SECRET environment variable is not defined.");
    process.exit(1);
}
const safeSecretKey = SECRET_KEY || "fallback_secret_do_not_use_in_prod";

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 20mb limit to handle Base64 images (Will be removed in future steps when using Supabase)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// 1. LOGIN
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query("SELECT admin_username, admin_password FROM site_settings WHERE id = 1");
        const settings = rows[0];
        const validUser = settings ? settings.admin_username : "admin";

        if (username === validUser && settings && settings.admin_password) {
            const passwordMatch = await bcrypt.compare(password, settings.admin_password);

            if (passwordMatch) {
                const token = jwt.sign({ username }, safeSecretKey, { expiresIn: '4h' });
                return res.json({ token });
            }
        }

        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Database error" });
    }
});

// 2. AUTH MIDDLEWARE
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) return res.status(403).json({ message: "No token" });

    const bearerToken = token.split(' ')[1];
    jwt.verify(bearerToken, safeSecretKey, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

// 3. GET ALL POSTS
app.get('/api/posts', async (req, res) => {
    try {
        const [posts] = await db.query("SELECT * FROM posts ORDER BY id DESC");
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// 4. ADD POST
app.post('/api/posts', authenticate, async (req, res) => {
    const { title, excerpt, content, author, image } = req.body;
    try {
        await db.execute(
            "INSERT INTO posts (title, excerpt, content, author, image) VALUES (?, ?, ?, ?, ?)",
            [title.trim(), excerpt?.trim() || null, content.trim(), author?.trim() || null, image || null]
        );
        res.status(201).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save post." });
    }
});

// 5. GET APPROVED COMMENTS
app.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const [comments] = await db.execute(
            "SELECT * FROM comments WHERE post_id = ? AND status = 'approved' ORDER BY created_at DESC",
            [req.params.id]
        );
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching comments" });
    }
});

// 6. ADD COMMENT
app.post('/api/posts/:id/comments', async (req, res) => {
    const { name, content } = req.body;
    try {
        await db.execute(
            "INSERT INTO comments (post_id, name, content) VALUES (?, ?, ?)",
            [req.params.id, name.trim(), content.trim()]
        );
        res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save comment." });
    }
});

// 7. GET ALL COMMENTS
app.get('/api/admin/comments', authenticate, async (req, res) => {
    try {
        const [comments] = await db.query(`
            SELECT c.*, p.title as post_title
            FROM comments c JOIN posts p ON c.post_id = p.id
            ORDER BY c.created_at DESC
        `);
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching admin comments" });
    }
});

// 8. UPDATE COMMENT STATUS
app.put('/api/admin/comments/:id', authenticate, async (req, res) => {
    try {
        await db.execute(
            "UPDATE comments SET status = ?, reply = ? WHERE id = ?",
            [req.body.status, req.body.reply || null, req.params.id]
        );
        res.json({ message: "Comment updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating comment" });
    }
});

// 9. DELETE POST
app.delete('/api/posts/:id', authenticate, async (req, res) => {
    try {
        await db.execute("DELETE FROM posts WHERE id = ?", [req.params.id]);
        res.json({ message: "Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting" });
    }
});

// 10. EDIT POST
app.put('/api/posts/:id', authenticate, async (req, res) => {
    const { title, excerpt, content, author, image } = req.body;
    try {
        await db.execute(
            "UPDATE posts SET title = ?, excerpt = ?, content = ?, author = ?, image = ? WHERE id = ?",
            [title.trim(), excerpt?.trim() || null, content.trim(), author?.trim() || null, image || null, req.params.id]
        );
        res.json({ message: "Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Update failed" });
    }
});

// 11. GET GLOBAL SETTINGS
app.get('/api/settings', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT id, lawyer_name, header_bio, lawyer_bio, lawyer_image,
                   author_name, author_bio, author_image, services_json,
                   testimonials_json, admin_username
            FROM site_settings WHERE id = 1
        `);
        res.json(rows[0] || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching settings" });
    }
});

// 12. UPDATE GLOBAL SETTINGS
app.put('/api/settings', authenticate, async (req, res) => {
    const { lawyer_name, header_bio, lawyer_bio, lawyer_image, author_name, author_bio, author_image, services_json, testimonials_json } = req.body;
    try {
        await db.execute(`
            UPDATE site_settings
            SET lawyer_name = ?, header_bio = ?, lawyer_bio = ?, lawyer_image = ?,
                author_name = ?, author_bio = ?, author_image = ?,
                services_json = ?, testimonials_json = ?
            WHERE id = 1
        `, [
            lawyer_name || null, header_bio || null, lawyer_bio || null, lawyer_image || null,
            author_name || null, author_bio || null, author_image || null,
            services_json || '[]', testimonials_json || '[]'
        ]);
        res.json({ message: "Settings saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save settings" });
    }
});

// 13. UPDATE ADMIN CREDENTIALS
app.put('/api/settings/credentials', authenticate, async (req, res) => {
    const { currentPassword, newUsername, newPassword } = req.body;
    try {
        const [rows] = await db.query("SELECT admin_password FROM site_settings WHERE id = 1");
        const settings = rows[0];

        const passwordMatch = await bcrypt.compare(currentPassword, settings.admin_password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "رمز عبور فعلی اشتباه است." });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.execute(
            "UPDATE site_settings SET admin_username = ?, admin_password = ? WHERE id = 1",
            [newUsername.trim(), hashedNewPassword]
        );

        res.json({ message: "Credentials updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating credentials" });
    }
});

// 14. GET ALL MESSAGES (Admin Only)
app.get('/api/admin/messages', authenticate, async (req, res) => {
    try {
        const [messages] = await db.query("SELECT * FROM messages ORDER BY created_at DESC");
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching messages" });
    }
});

// 15. ADD NEW MESSAGE (Public)
app.post('/api/messages', async (req, res) => {
    const { name, email, phone, subject, content } = req.body;
    try {
        await db.execute(
            "INSERT INTO messages (name, email, phone, subject, content) VALUES (?, ?, ?, ?, ?)",
            [name?.trim() || 'ناشناس', email?.trim() || null, phone?.trim() || null, subject?.trim() || null, content?.trim() || '']
        );
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save message." });
    }
});

// 16. DELETE MESSAGE (Admin Only)
app.delete('/api/admin/messages/:id', authenticate, async (req, res) => {
    try {
        await db.execute("DELETE FROM messages WHERE id = ?", [req.params.id]);
        res.json({ message: "Message deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting message" });
    }
});

// 17. TOGGLE READ STATUS (Admin Only)
app.put('/api/admin/messages/:id/read', authenticate, async (req, res) => {
    try {
        const { is_read } = req.body;
        await db.execute("UPDATE messages SET is_read = ? WHERE id = ?", [is_read ? 1 : 0, req.params.id]);
        res.json({ message: "Message status updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating message status" });
    }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));