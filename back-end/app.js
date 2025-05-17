const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const budgetCategoryRoutes = require('./routes/budgetCategory.routes');
const transactionRoutes  = require('./routes/transaction.routes');
const summaryRoutes  = require('./routes/summary.routes');


const errorHandler = require('./middlewares/error.middleware')

//  cors middleware
const allowedOrigins = [
    'http://localhost:5174',
    'http://localhost:5173',            // Local development     // Local development
    'https://finance-tracker-0101.netlify.app' // Netlify deployed frontend,s
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,  // Allow cookies/auth headers
  };
  app.use(cors(corsOptions));
app.use(express.json());

// Routing 
app.use('/api/auth', authRoutes);
app.use('/api/budget-category', budgetCategoryRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/summary', summaryRoutes);

// Error Handling 
app.use(errorHandler)



module.exports = app