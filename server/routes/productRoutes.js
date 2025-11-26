const express = require("express");
const { upload, handleUploadError } = require("../middleware/upload");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
} = require("../controllers/productController");

const router = express.Router();

// Get all products (with optional query params: ?page=1&limit=10&search=query&sortBy=price&sortOrder=asc)
router.get("/", getProducts);

// Get single product
router.get("/:id", getProduct);

// Create product (requires image file)
router.post("/", upload.single("image"), handleUploadError, createProduct);

// Update product (image is optional)
router.put("/:id", upload.single("image"), handleUploadError, updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
