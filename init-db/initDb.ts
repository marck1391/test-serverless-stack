import fs from 'fs';
import path from 'path';
import { executeScript } from './utils';

export default async function initDb() {
    const sqlDir = path.join(__dirname, 'sql');
    // Dynamically read all SQL files in the directory
    const sqlFiles = fs.readdirSync(sqlDir).filter((file) => file.endsWith('.sql'));

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
