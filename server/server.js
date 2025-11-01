import express from 'express'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRoute from './routes/userRoute.js'

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/v1/user', userRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Start Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port: ${PORT}`);
});
