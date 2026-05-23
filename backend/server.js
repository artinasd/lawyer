// backend/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const SECRET_KEY = "my_ultra_secure_secret"; // Move to .env in production

app.use(cors());
app.use(express.json());

// 1. LOGIN ENDPOINT
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // NOTE: For a real app, store hashed passwords in DB!
    // This is a simple simulation check.
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
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send("Unauthorized");
        next();
    });
};

// Protect the POST route so only admins can add posts
app.post('/api/posts', authenticate, (req, res) => {
    const { title, excerpt, content, author } = req.body;
    const stmt = db.prepare("INSERT INTO posts (title, excerpt, content, author) VALUES (?, ?, ?, ?)");
    stmt.run(title, excerpt, content, author);
    res.status(201).json({ message: "Success" });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));