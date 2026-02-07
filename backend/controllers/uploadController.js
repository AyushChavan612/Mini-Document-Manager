const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.uploadDocuments = async (req, res) => {
    // 1. Check if files exist
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
        // 2. Prepare database queries
        const insertPromises = req.files.map((file) => {
            const query = `
                INSERT INTO documents (title, size, path, mime_type)
                VALUES (?, ?, ?, ?)
            `;
            
            // Assignment says Title can default to filename
            const values = [
                file.originalname, 
                file.size, 
                file.path,
                file.mimetype
            ];

            return db.execute(query, values);
        });

        // 3. Execute all inserts
        await Promise.all(insertPromises);

        res.status(201).json({ 
            message: 'Documents uploaded successfully',
            count: req.files.length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error during upload' });
    }
};



