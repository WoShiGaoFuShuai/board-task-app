import { drizzle } from 'drizzle-orm/better-sqlite3';

if (!process.env.DB_FILE_NAME) throw new Error('Database file is not found');

export const db = drizzle(process.env.DB_FILE_NAME);
