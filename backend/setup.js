const mysql = require('mysql2/promise');

async function setup() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ayush@612' 
    });

    try {
        await connection.query("CREATE DATABASE IF NOT EXISTS doc_manager");
        await connection.changeUser({ database: 'doc_manager' });

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS documents (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,      -- Required for UI
                size INT NOT NULL,                -- Required for UI
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Required for Sorting
                path VARCHAR(500) NOT NULL,       -- REQUIRED: To find file on disk
                mime_type VARCHAR(100)            -- REQUIRED: To open file correctly
            )
        `;
        await connection.query(createTableQuery);
        console.log("Database initialized with simplified schema.");

    } catch (err) {
        console.error("Setup failed:", err);
    } finally {
        await connection.end();
    }
}

setup();