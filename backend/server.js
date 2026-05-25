// backend/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const SECRET_KEY = "my_ultra_secure_secret";

app.use(cors());

// Limits increased to handle base64 images up to 3MB+
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// 1. LOGIN ENDPOINT
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password123") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// 2. PROTECTED ROUTE MIDDLEWARE
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send("No token provided");

    // Split "Bearer <token>"
    const bearerToken = token.split(' ')[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send("Unauthorized");
        next();
    });
};

// 3. GET ALL POSTS (Public or Protected, depending on your needs)
app.get('/api/posts', (req, res) => {
    try {
        const posts = db.prepare("SELECT * FROM posts ORDER BY id DESC").all();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// 4. ADD NEW POST
app.post('/api/posts', authenticate, (req, res) => {
    const { title, excerpt, content, author, image } = req.body;

    try {
        const stmt = db.prepare("INSERT INTO posts (title, excerpt, content, author, image) VALUES (?, ?, ?, ?, ?)");
        stmt.run(title, excerpt, content, author, image);
        res.status(201).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save post" });
    }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));