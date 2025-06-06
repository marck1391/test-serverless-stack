import { pool } from "./connection";
import fs from 'fs';
import path from 'path';

export async function executeScript(filePath:string) {
  const script = fs.readFileSync(filePath, 'utf8');
  const connection = await pool.getConnection();
  try {
    console.log(`Executing script: ${path.basename(filePath)}`);
    await connection.query(script);
    console.log(`Successfully executed: ${path.basename(filePath)}`);
  } catch (error:any) {
    console.error(`Error executing ${path.basename(filePath)}:`, error.message);
  } finally {
    connection.release();
  }
}