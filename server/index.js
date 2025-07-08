import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDB } from './database/db.js';
import applicantRoutes from './routes/applicants.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import { authenticateToken } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applicants', authenticateToken, applicantRoutes);
app.use('/api/upload', authenticateToken, uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize SQLite database
    await initDB();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Database initialized and ready');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();