import dotenv from 'dotenv';
const PORT = 3000;
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import roomRoutes from './routes/roomRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.DB_URL);

app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
