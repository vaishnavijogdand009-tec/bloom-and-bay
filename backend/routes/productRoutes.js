const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProductsByCategory,
    filterProductsByPrice,
    sortProducts,
    paginateProducts
} = require("../controllers/productController");

// Middleware
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

// ================= CUSTOMER ROUTES =================

// Search Products
router.get("/search", searchProducts);

// Filter Products By Category
router.get("/category/:category", filterProductsByCategory);

// Filter Products By Price
router.get("/filter/price", filterProductsByPrice);

// Sort Products
router.get("/sort", sortProducts);

// Paginate Products
router.get("/paginate", paginateProducts);

// Get All Products
router.get("/", getAllProducts);

// Get Single Product
router.get("/:id", getSingleProduct);



// ================= ADMIN ROUTES =================

// Add Product
router.post(
    "/",
    protect,
    adminOnly,
    upload.single("image"),
    addProduct
);

// Update Product
router.put(
    "/:id",
    protect,
    adminOnly,
    upload.single("image"),
    updateProduct
);

// Delete Product
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProduct
);

module.exports = router;
