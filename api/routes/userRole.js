const express = require("express");
const router = express.Router();
const {
  createUserRoles,
  getAllUserRoles,
  getUserRoleById,
  userRoleUpdateById,
  userRoleDeleteById,
} = require("../controllers/userRoleController.js");

router.post("/", createUserRoles);
router.get("/", getAllUserRoles);
router.get("/:userRoleId", getUserRoleById);
router.put("/:userRoleId", userRoleUpdateById);
router.delete("/:userRoleId", userRoleDeleteById);

module.exports = router;
