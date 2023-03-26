const express = require("express");
const router = express.Router();
const {
  createStates,
  getAllStates,
  getStateById,
  stateUpdateById,
  stateDeleteById,
} = require("../controllers/stateController.js");

router.post("/", createStates);
router.get("/", getAllStates);
router.get("/:stateId", getStateById);
router.put("/:stateId", stateUpdateById);
router.delete("/:stateId", stateDeleteById);

module.exports = router;
