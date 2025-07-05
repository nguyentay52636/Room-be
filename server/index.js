const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db'); 
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv');
const rootRouter = require('./routes/root'); 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger.js');

const app = express();
dotenv.config(); 

connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

app.use('/api', rootRouter);
app.get('/v1/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});