const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'root',      // Your database username
    password: '',      // Your database password
    database: 'gymDB'  // Your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// API endpoint to handle membership registration
app.post('/register', (req, res) => {
    const { name, email, phone, membershipType } = req.body;

    const query = 'INSERT INTO members (name, email, phone, membershipType) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, membershipType], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Registration successful!' });
    });
});

// API endpoint to handle contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});