const router = require('express').Router();
const FilterController = require('../controllers/FilterController');

// Filter routes
router.get('/', FilterController.chooseGame);

router.get('/fortnite', FilterController.getFilter);

router.get('/rocket-league', FilterController.getFilter);

router.get('/nba-2k21', FilterController.getFilter);

router.get('/minecraft', FilterController.getFilter);

router.get('/cold-war', FilterController.getFilter);

// router.post('/', FilterController.useFilter);

module.exports = router;