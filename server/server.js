import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRoute from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ CORS setup (with safe fallback)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// // Required for preflight
// app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/user', userRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port: ${PORT}`);
});
