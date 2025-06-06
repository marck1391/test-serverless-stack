const { pool } = require('./connection');

(async () => {

  try {
    const connection = await pool.getConnection();
    console.log('Connection to the database was successful!');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await pool.end();
  }
})();
