import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database connection
const dbPath = process.env.DB_PATH || path.join(__dirname, 'ongc_ats.db');

// Ensure the database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize tables
const initDB = async () => {
  console.log('Initializing database...');
  
  try {
    // Users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created/verified successfully');

    // Applicants table
    db.exec(`
      CREATE TABLE IF NOT EXISTS applicants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        position TEXT,
        experience INTEGER,
        skills TEXT,
        education TEXT,
        location TEXT,
        resume_path TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Applicants table created/verified successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
    throw error;
  }

  // Create default admin user
  try {
    const { User } = await import('../models/User.js');
    const adminUser = User.createDefaultAdmin();
    console.log('Default admin user created/verified:', adminUser.username);
  } catch (error) {
    console.error('Error creating default admin user:', error);
    throw error;
  }

  console.log('Database initialized successfully');
};

export { db, initDB };