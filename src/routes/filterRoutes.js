const router = require('express').Router();
const FilterController = require('../controllers/FilterController');

// Filter routes
router.get('/', FilterController.chooseGame);

router.get('/fortnite', FilterController.getFilterFort);

router.post('/fortnite', FilterController.useFilter);

router.get('/rocket-league', FilterController.getFilterRocket);

router.post('/rocket-league', FilterController.useFilter);

router.get('/nba-2k21', FilterController.getFilterNba);

router.post('/nba-2k21', FilterController.useFilter);

router.get('/minecraft', FilterController.getFilterMine);

router.post('/minecraft', FilterController.useFilter);

router.get('/cold-war', FilterController.getFilterCold);

router.post('/cold-war', FilterController.useFilter);

// router.post('/', FilterController.useFilter);

module.exports = router;
