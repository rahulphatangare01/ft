const router = require('express').Router();
const controller = require('../controllers/summary.controller');
const auth = require('../middlewares/auth.middleware');


router.use(auth);

router.get('/totals', controller.getSummary);
router.get('/category-expense', controller.getCategoryExpense);
router.get('/monthly-expense', controller.getMonthlyComparison);

module.exports = router