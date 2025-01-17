
const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    
    new winston.transports.File({
      filename: 'logs/server.log',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      )
    }),
    // MongoDB transport
    new winston.transports.MongoDB({
      level: 'error',
      // db: 'mongodb://localhost:27017/logs',
      db: 'mongodb+srv://sourabhpatil0369:EbyytSSzFpPjxy9v@cluster0.h6lnfl5.mongodb.net/',
      options: {
        useUnifiedTopology: true
      },
      collection: 'server_logs',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});
module.exports = logger;
