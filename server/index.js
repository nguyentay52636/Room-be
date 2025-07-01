const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db'); 
const PORT = process.env.PORT;
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); 

const app = express();
dotenv.config(); 

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use('/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});