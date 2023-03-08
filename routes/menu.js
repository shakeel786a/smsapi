const express = require("express");
const router = express.Router();
const {
  createMenu,
  getAllMenu,
  getMenuById,
  menuUpdateById,
  menuDeleteById,
} = require("../controllers/menuController.js");

router.post("/", createMenu);
router.get("/", getAllMenu);
router.get("/:menuId", getMenuById);
router.put("/:menuId", menuUpdateById);
router.delete("/:menuId", menuDeleteById);

module.exports = router;
