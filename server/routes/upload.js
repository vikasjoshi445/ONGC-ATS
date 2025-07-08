import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import { Readable } from 'stream';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload CSV file
router.post('/csv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const results = [];
    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);
    
    readable
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // Process CSV data and convert to applicant format
        const applicants = results.map(row => ({
          name: row.name || row.Name,
          email: row.email || row.Email,
          mobile: row.mobile || row.Mobile,
          age: parseInt(row.age || row.Age),
          gender: row.gender || row.Gender,
          category: row.category || row.Category,
          address: row.address || row.Address,
          father_name: row.father_name || row['Father Name'],
          father_occupation: row.father_occupation || row['Father Occupation'],
          present_institute: row.present_institute || row['Present Institute'],
          areas_of_training: row.areas_of_training || row['Areas of Training'],
          present_semester: parseInt(row.present_semester || row['Present Semester']),
          last_sem_sgpa: parseFloat(row.last_sem_sgpa || row['Last Semester SGPA']),
          percentage_12th: parseFloat(row.percentage_12th || row['12th Percentage']),
          date_of_submission: new Date(row.date_of_submission || row['Date of Submission']),
          mentor: {
            available: row.mentor_available !== 'false',
            name: row.mentor_name || 'TBD',
            cpf: row.mentor_cpf || 'TBD',
            designation: row.mentor_designation || 'TBD',
            section: row.mentor_section || 'TBD',
            location: row.mentor_location || 'TBD',
            email: row.mentor_email || 'TBD'
          }
        }));
        
        res.json({ 
          message: 'CSV processed successfully', 
          count: applicants.length,
          applicants: applicants.slice(0, 5) // Preview first 5 records
        });
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process CSV file' });
  }
});

export default router;