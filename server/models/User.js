import { db } from '../database/db.js';
import bcrypt from 'bcryptjs';

export class User {
  static create(userData) {
    const { username, email, password, role = 'user' } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const stmt = db.prepare(`
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `);
    
    try {
      const result = stmt.run(username, email, hashedPassword, role);
      return { id: result.lastInsertRowid, username, email, role };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  static findByUsername(username) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(username);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  static comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  // Create default admin user if none exists
  static createDefaultAdmin() {
    console.log('Checking for existing admin user...');
    
    // Check if admin already exists
    let existingAdmin = this.findByEmail('admin@ongc.com');
    if (!existingAdmin) {
      existingAdmin = this.findByUsername('hr_manager');
    }
    
    if (!existingAdmin) {
      console.log('Creating default admin user...');
      try {
        const adminUser = this.create({
          username: 'hr_manager',
          email: 'admin@ongc.com',
          password: 'admin123',
          role: 'admin'
        });
        console.log('Default admin user created successfully');
        return adminUser;
      } catch (error) {
        console.error('Failed to create default admin user:', error);
        throw error;
      }
    } else {
      console.log('Admin user already exists');
      return existingAdmin;
    }
  }
}