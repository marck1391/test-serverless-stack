import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST||'localhost',
    user: process.env.DB_USER||'admin',
    password: process.env.DB_PASSWORD||'adminpassword',
    database: process.env.DB_NAME||'sam_app_db',
    waitForConnections: true,
    connectionLimit: 10,
});

export let dbConn: mysql.PoolConnection;

export async function initializeConnection() {
    if (!dbConn) {
        dbConn = await pool.getConnection();
    }
}