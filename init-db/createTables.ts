import fs from 'fs';
import path from 'path';
import { executeScript } from './utils';

export async function createTables() {
  const sqlDir = path.join(__dirname);
  const sqlFiles = [
    './sql/create_clients_table.sql',
    './sql/create_assets_table.sql',
    './sql/create_contracts_table.sql',
    './sql/create_payments_table.sql',
  ];

  const errors:string[] = []

  for (const file of sqlFiles) {
    const filePath = path.join(sqlDir, file);
    if (fs.existsSync(filePath)) {
      await executeScript(filePath);
    } else {
      console.warn(`File not found: ${file}`);
      errors.push(`File not found: ${file}`);
    }
  }

  return errors
}
