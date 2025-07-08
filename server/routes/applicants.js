import express from 'express';
import { Applicant } from '../models/Applicant.js';

const router = express.Router();

// Get all applicants with optional filtering
router.get('/', async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.position) filters.position = req.query.position;
    if (req.query.experience) filters.experience = parseInt(req.query.experience);
    if (req.query.location) filters.location = req.query.location;
    if (req.query.status) filters.status = req.query.status;

    const applicants = Applicant.findAll(filters);
    const total = Applicant.count(filters);

    res.json({
      applicants,
      total,
      filters
    });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single applicant
router.get('/:id', async (req, res) => {
  try {
    const applicant = Applicant.findById(parseInt(req.params.id));
    
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.json(applicant);
  } catch (error) {
    console.error('Error fetching applicant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new applicant
router.post('/', async (req, res) => {
  try {
    const applicant = Applicant.create(req.body);
    res.status(201).json(applicant);
  } catch (error) {
    console.error('Error creating applicant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update applicant
router.put('/:id', async (req, res) => {
  try {
    const updated = Applicant.update(parseInt(req.params.id), req.body);
    
    if (!updated) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    const applicant = Applicant.findById(parseInt(req.params.id));
    res.json(applicant);
  } catch (error) {
    console.error('Error updating applicant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete applicant
router.delete('/:id', async (req, res) => {
  try {
    const deleted = Applicant.delete(parseInt(req.params.id));
    
    if (!deleted) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    console.error('Error deleting applicant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Bulk update applicant status
router.patch('/bulk-status', async (req, res) => {
  try {
    const { applicantIds, status } = req.body;
    
    if (!applicantIds || !Array.isArray(applicantIds) || !status) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const results = applicantIds.map(id => {
      return Applicant.update(parseInt(id), { status });
    });

    const successCount = results.filter(Boolean).length;
    
    res.json({ 
      message: `Updated ${successCount} applicants`,
      updated: successCount,
      total: applicantIds.length
    });
  } catch (error) {
    console.error('Error bulk updating applicants:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;