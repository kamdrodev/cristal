dotenv.config();

import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL);

app.use(cors());

import authRoutes from './routes/auth.js';
import listsRoutes from './routes/lists.js';
import wordsRoutes from './routes/words.js';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/', listsRoutes);
app.use('/api/', wordsRoutes);

app.get('/api', (req, res) => {
  return res.status(200).json({
    'message': 'Hello World'
  });
});

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  } 
  if (!err.message) {
    err.message = 'Something went really wrong';
  }
  res.status(err.status).json({
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;