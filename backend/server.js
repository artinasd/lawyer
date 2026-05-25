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
    if (username === "admin" && password === "password123") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
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
    if (!title || !title.trim() || !content || !content.trim()) return res.status(400).json({ message: "Required fields missing." });

    try {
        const stmt = db.prepare("INSERT INTO posts (title, excerpt, content, author, image) VALUES (?, ?, ?, ?, ?)");
        stmt.run(title.trim(), excerpt?.trim() || null, content.trim(), author?.trim() || null, image || null);
        res.status(201).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: "Failed to save post." });
    }
});

// 5. GET COMMENTS FOR POST (PUBLIC - ONLY APPROVED)
app.get('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    try {
        const comments = db.prepare("SELECT * FROM comments WHERE post_id = ? AND status = 'approved' ORDER BY created_at DESC").all(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
});

// 6. ADD COMMENT (PUBLIC - DEFAULTS TO PENDING)
app.post('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const { name, content } = req.body;
    if (!name || !name.trim() || !content || !content.trim()) return res.status(400).json({ message: "Fields required." });

    try {
        const stmt = db.prepare("INSERT INTO comments (post_id, name, content) VALUES (?, ?, ?)");
        stmt.run(postId, name.trim(), content.trim());
        res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to save comment." });
    }
});

// 7. GET ALL COMMENTS FOR ADMIN (PROTECTED)
app.get('/api/admin/comments', authenticate, (req, res) => {
    try {
        const comments = db.prepare(`
            SELECT c.*, p.title as post_title
            FROM comments c
                     JOIN posts p ON c.post_id = p.id
            ORDER BY c.created_at DESC
        `).all();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin comments" });
    }
});

// 8. UPDATE COMMENT STATUS & REPLY (PROTECTED)
app.put('/api/admin/comments/:id', authenticate, (req, res) => {
    const { status, reply } = req.body;
    try {
        const stmt = db.prepare("UPDATE comments SET status = ?, reply = ? WHERE id = ?");
        stmt.run(status, reply || null, req.params.id);
        res.json({ message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating comment" });
    }
});

// 9. DELETE POST (PROTECTED)
app.delete('/api/posts/:id', authenticate, (req, res) => {
    try {
        const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
        const info = stmt.run(req.params.id);

        if (info.changes > 0) {
            res.json({ message: "Post deleted successfully" });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});

// 10. EDIT POST (PROTECTED)
app.put('/api/posts/:id', authenticate, (req, res) => {
    const { title, excerpt, content, author, image } = req.body;
    if (!title || !title.trim() || !content || !content.trim()) {
        return res.status(400).json({ message: "Title and content are required fields." });
    }

    try {
        const stmt = db.prepare("UPDATE posts SET title = ?, excerpt = ?, content = ?, author = ?, image = ? WHERE id = ?");
        const info = stmt.run(
            title.trim(),
            excerpt?.trim() || null,
            content.trim(),
            author?.trim() || null,
            image || null,
            req.params.id
        );

        if (info.changes > 0) {
            res.json({ message: "Post updated successfully" });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Failed to update post." });
    }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));