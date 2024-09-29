const express = require("express");
const router = express.Router();
const {
  createPorducts,
  getAllProducts,
  getProductById,
  productUpdateById,
  productDeleteById,
} = require("../controllers/productsController.js");

router.post("/", createPorducts);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.put("/:productId", productUpdateById);
router.delete("/:productId", productDeleteById);

module.exports = router;
