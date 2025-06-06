const mysql = require("mysql2/promise")
const fs = require("fs")
const path = require("path")

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootpassword",
  database: process.env.DB_NAME || "app_db",
  waitForConnections: true,
  connectionLimit: 10,
})

async function executeScript(filePath) {
  const script = fs.readFileSync(filePath, "utf8")
  const connection = await pool.getConnection()
  try {
    console.log(`Executing script: ${path.basename(filePath)}`)
    await connection.query(script)
    console.log(`Successfully executed: ${path.basename(filePath)}`)
  } catch (error) {
    console.error(`Error executing ${path.basename(filePath)}:`, error.message)
  } finally {
    connection.release()
  }
}

async function deleteTablesAndProcedures() {
  const connection = await pool.getConnection()
  try {
    console.log("Disabling foreign key checks...")
    await connection.query("SET FOREIGN_KEY_CHECKS = 0")

    console.log("Deleting all tables and procedures...")

    // Drop all procedures
    const [procedures] = await connection.query(
      "SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = ? AND ROUTINE_TYPE = 'PROCEDURE'",
      ["sam_app_db"]
    )
    for (const procedure of procedures) {
      await connection.query(
        `DROP PROCEDURE IF EXISTS \`${procedure.ROUTINE_NAME}\``
      )
      console.log(`Dropped procedure: ${procedure.ROUTINE_NAME}`)
    }

    // Drop all tables
    const [tables] = await connection.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?",
      ["sam_app_db"]
    )
    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS \`${table.TABLE_NAME}\``)
      console.log(`Dropped table: ${table.TABLE_NAME}`)
    }

    console.log("Re-enabling foreign key checks...")
    await connection.query("SET FOREIGN_KEY_CHECKS = 1")

    console.log("All tables and procedures deleted successfully.")
  } catch (error) {
    console.error("Error deleting tables and procedures:", error.message)
  } finally {
    connection.release()
  }
}

async function resetDatabase() {
  const sqlDir = path.join(__dirname, "../init-db/sql")

  // Dynamically read all SQL files in the directory
  const sqlFiles = fs
    .readdirSync(sqlDir)
    .filter((file) => file.endsWith(".sql"))

  for (const file of sqlFiles) {
    const filePath = path.join(sqlDir, file)
    if (fs.existsSync(filePath)) {
      await executeScript(filePath)
    } else {
      console.warn(`File not found: ${file}`)
    }
  }

  pool.end()
}

module.exports = { pool, deleteTablesAndProcedures, resetDatabase }
