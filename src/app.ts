import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(cors({
  origin: 'http://localhost:5173', // allow Vite dev server
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/', (_req, res) => {
  res.send('Audio Transcription API is running.');
});


import transcriptionRoutes from './routes/transcription';
app.use('/transcription', transcriptionRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
