// backend/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const SECRET_KEY = "my_ultra_secure_secret"; // Move to .env in production

app.use(cors());

// INCREASE LIMITS HERE: This allows Base64 image strings to be sent
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// 1. LOGIN ENDPOINT
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // NOTE: For a real app, store hashed passwords in DB!
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
    // Added 'image' to the destructured body
    const { title, excerpt, content, author, image } = req.body;

    // Updated SQL query to include the image column
    // NOTE: Ensure your 'posts' table in the database has an 'image' column
    const stmt = db.prepare("INSERT INTO posts (title, excerpt, content, author, image) VALUES (?, ?, ?, ?, ?)");
    stmt.run(title, excerpt, content, author, image);

    res.status(201).json({ message: "Success" });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));