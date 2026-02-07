const express = require('express');
const cors = require('cors');
const path = require('path');
const docRoutes = require('./routes/docRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());                 // Allow frontend to access backend
app.use(express.json());         // Parse JSON bodies
app.use(express.static('public')); // Serve frontend files (later)

// All document routes will start with /api/documents
app.use('/api', docRoutes);

// Global Error Handler 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});