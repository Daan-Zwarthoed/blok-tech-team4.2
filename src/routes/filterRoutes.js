const router = require("express").Router();
const FilterController = require("../controllers/FilterController");

//Filter routes
router.get("/", FilterController.getFilter);

router.post("/", FilterController.useFilter);

module.exports = router;