
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./config/logger');
const logRoutes = require('./route/logRoutes');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', logRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the Calculator Log API!');
  logger.info('Served root endpoint');
});


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
