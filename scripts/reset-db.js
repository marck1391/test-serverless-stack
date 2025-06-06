const { deleteTablesAndProcedures, resetDatabase } = require('./connection');

// Main execution flow
async function main() {
  await deleteTablesAndProcedures();
  await resetDatabase();
}

main().catch((err) => {
  console.error('Error resetting database:', err.message);
  process.exit(1);
});
