const db = require('../config/db');

// GET /documents?page=1&limit=5&q=resume
exports.getDocuments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        if (limit > 100) limit = 100; // Safety Cap
        
        const search = req.query.q || ''; 
        const offset = (page - 1) * limit;

        let sortBy = req.query.sortBy || 'created_at';
        let order = req.query.order || 'DESC';

        const validSortColumns = ['title', 'size', 'created_at'];
        const validOrder = ['ASC', 'DESC'];

        if (!validSortColumns.includes(sortBy)) {
            sortBy = 'created_at';
        }
        if (!validOrder.includes(order.toUpperCase())) {
            order = 'DESC';
        }

        let query = 'SELECT id, title, size, created_at FROM documents';
        let queryParams = [];

        if (search) {
            query += ' WHERE title LIKE ?';
            queryParams.push(`%${search}%`);
        }

        query += ` ORDER BY ${sortBy} ${order} LIMIT ${limit} OFFSET ${offset}`;

        const [rows] = await db.execute(query, queryParams);

        let countQuery = 'SELECT COUNT(*) as total FROM documents';
        let countParams = [];
        
        if (search) {
            countQuery += ' WHERE title LIKE ?';
            countParams.push(`%${search}%`);
        }

        const [countResult] = await db.execute(countQuery, countParams);

        res.json({
            documents: rows,
            total: countResult[0].total,
            page: page,
            totalPages: Math.ceil(countResult[0].total / limit)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
};