const router = require('express').Router();
const FilterController = require('../controllers/FilterController');

// Filter routes
router.get('/', FilterController.chooseGame);

router.get('/fortnite', FilterController.getFilterFort);

router.get('/rocket-league', FilterController.getFilterRocket);

router.get('/nba-2k21', FilterController.getFilterNba);

router.get('/minecraft', FilterController.getFilterMine);

router.get('/cold-war', FilterController.getFilterCold);

module.exports = router;
