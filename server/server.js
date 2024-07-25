
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./config/logger');
const logRoutes = require('./route/logRoutes');

const app = express();

// Connect to MongoDB
connectDB();
// Middleware setup
app.use(cors());
app.use(express.json());
// Route setup
app.use('/api', logRoutes);

// Root 
app.get('/', (req, res) => {
  res.send('Hello from the Calculator Log API!');
  logger.info('Served root endpoint');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});