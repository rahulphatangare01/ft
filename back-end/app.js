const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const budgetCategoryRoutes = require('./routes/budgetCategory.routes');
const transactionRoutes  = require('./routes/transaction.routes');
const summaryRoutes  = require('./routes/summary.routes');


const errorHandler = require('./middlewares/error.middleware')

app.use(express.json());

// Routing 
app.use('/api/auth', authRoutes);
app.use('/api/budget-category', budgetCategoryRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/summary', summaryRoutes);

// Error Handling 
app.use(errorHandler)



module.exports = app