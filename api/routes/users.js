const express = require("express");
const router = express.Router();
const {
  createUsers,
  getAllUsers,
  getUserById,
  userUpdateById,
  userDeleteById,
} = require("../controllers/userController.js");

router.post("/", createUsers);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", userUpdateById);
router.delete("/:userId", userDeleteById);

module.exports = router;
