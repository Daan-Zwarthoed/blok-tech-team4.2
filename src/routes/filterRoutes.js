const router = require('express').Router();
const FilterController = require('../controllers/FilterController');

// Filter routes
router.get('/:userId', FilterController.getFilter);

router.post('/:userId', FilterController.useFilter);

module.exports = router;
