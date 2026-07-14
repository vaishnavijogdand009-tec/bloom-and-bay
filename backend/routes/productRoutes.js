const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    addProduct
} = require("../controllers/productController");

const upload = require("../middleware/upload");

// Customer
router.get("/", getAllProducts);

// Admin
router.post("/", upload.single("image"), addProduct);

module.exports = router;

