const router = require('express').Router();
const controller = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth);

router.post('/', controller.create);
router.get('/',controller.getAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete)


module.exports = router