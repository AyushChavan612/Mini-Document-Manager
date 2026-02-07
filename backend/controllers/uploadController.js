const db = require('../config/db');
const fs = require('fs');
const { scanFile } = require('../utils/antivirus');
const notificationQueue = require('../utils/notificationQueue');

exports.uploadDocuments = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
        for (f of req.files) {
            const scan = await scanFile(f.path);
            
            if (scan.isInfected) {
                if (fs.existsSync(f.path)) fs.unlinkSync(f.path);
                return res.status(403).json({ 
                    error: `Security Alert: File ${f.originalname} is infected and was deleted.` 
                });
            }

            const q = 'INSERT INTO documents (title, size, path, mime_type) VALUES (?, ?, ?, ?)';
            const v = [f.originalname, f.size, f.path, f.mimetype];

            await db.execute(q, v);

            notificationQueue.push({
                filename: f.originalname,
                uploadedAt: new Date()
            });
        }

        res.status(201).json({ 
            message: 'Documents uploaded successfully',
            count: req.files.length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error during upload' });
    }
};