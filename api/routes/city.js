const express = require("express");
const router = express.Router();
const {
  createCity,
  getAllCities,
  getCityById,
  cityUpdateById,
  cityDeleteById,
} = require("../controllers/cityController.js");

router.post("/", createCity);
router.get("/", getAllCities);
router.get("/:cityId", getCityById);
router.put("/:cityId", cityUpdateById);
router.delete("/:cityId", cityDeleteById);

module.exports = router;
