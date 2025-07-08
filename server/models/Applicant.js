import { db } from '../database/db.js';

export class Applicant {
  static create(applicantData) {
    const {
      name,
      email,
      phone,
      position,
      experience,
      skills,
      education,
      location,
      resume_path,
      status = 'pending'
    } = applicantData;

    const stmt = db.prepare(`
      INSERT INTO applicants (name, email, phone, position, experience, skills, education, location, resume_path, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, phone, position, experience, skills, education, location, resume_path, status);
    return { id: result.lastInsertRowid, ...applicantData };
  }

  static findAll(filters = {}) {
    let query = 'SELECT * FROM applicants WHERE 1=1';
    const params = [];

    if (filters.position) {
      query += ' AND position LIKE ?';
      params.push(`%${filters.position}%`);
    }

    if (filters.experience) {
      query += ' AND experience >= ?';
      params.push(filters.experience);
    }

    if (filters.location) {
      query += ' AND location LIKE ?';
      params.push(`%${filters.location}%`);
    }

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM applicants WHERE id = ?');
    return stmt.get(id);
  }

  static update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE applicants SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    const stmt = db.prepare(query);
    const result = stmt.run(...values, id);
    
    return result.changes > 0;
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM applicants WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static count(filters = {}) {
    let query = 'SELECT COUNT(*) as count FROM applicants WHERE 1=1';
    const params = [];

    if (filters.position) {
      query += ' AND position LIKE ?';
      params.push(`%${filters.position}%`);
    }

    if (filters.experience) {
      query += ' AND experience >= ?';
      params.push(filters.experience);
    }

    if (filters.location) {
      query += ' AND location LIKE ?';
      params.push(`%${filters.location}%`);
    }

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    const stmt = db.prepare(query);
    const result = stmt.get(...params);
    return result.count;
  }
}