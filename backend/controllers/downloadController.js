const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// GET /documents/:id/download
exports.downloadDocument = async (req, res) => {
    try {
        const docId = req.params.id;

        const [rows] = await db.execute('SELECT * FROM documents WHERE id = ?', [docId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const doc = rows[0];
        
        if (!fs.existsSync(doc.path)) {
            return res.status(404).json({ error: 'File missing from server storage' });
        }

        res.setHeader('Content-Disposition', `attachment; filename="${doc.title}"`);
        res.setHeader('Content-Type', doc.mime_type);

        const fileStream = fs.createReadStream(doc.path);
        
        fileStream.pipe(res);

    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Download failed' });
        }
    }
};