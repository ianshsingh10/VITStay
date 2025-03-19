import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/user.js';
import hostelRoutes from './routes/hostel.js';
import { database } from './config.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// User and Doctor routes
app.use('/api/users', userRoutes);
app.use('/api/hostels', hostelRoutes);

// Connect to the database
mongoose.connect(database)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
