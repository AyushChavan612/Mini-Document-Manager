const db = require('../config/db');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

exports.downloadZip = async (req, res) => {
    const { ids } = req.query; 

    if (!ids) return res.status(400).json({ error: 'No IDs provided' });

    try {
        const idList = ids.split(',').map(id => parseInt(id)); 
        
        const p = idList.map(() => '?').join(',');
        const [files] = await db.execute(`SELECT * FROM documents WHERE id IN (${p})`, idList);

        if (files.length === 0) return res.status(404).json({ error: 'Files not found' });

        res.attachment('files.zip');

        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('error', (err) => res.status(500).send({ error: err.message }));
        archive.pipe(res);

        files.forEach((f) => {
            if (fs.existsSync(f.path)) {
                archive.file(f.path, { name: f.title });
            }
        });

        await archive.finalize();

    } catch (err) {
        console.error(err);
        if (!res.headersSent) res.status(500).json({ error: 'Server error' });
    }
};