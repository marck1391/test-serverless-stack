import fs from 'fs';
import path from "path";
import { executeScript } from "./utils";

export async function createProcedures() {
  const sqlDir = path.join(__dirname);
  const sqlFiles = [
    "./sql/create_client.sql",
    "./sql/list_clients.sql",
    "./sql/update_client.sql",
    "./sql/delete_client.sql",
  ]

  const errors: string[] = [];

  for (const file of sqlFiles) {
    const filePath = path.join(sqlDir, file);
    if (fs.existsSync(filePath)) {
      await executeScript(filePath);
    } else {
      console.warn(`File not found: ${file}`);
      errors.push(`File not found: ${file}`);
    }
  }

  return errors;
}
