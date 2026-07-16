const Product = require("../models/Product");

// Get All Products
const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Add Product
const addProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            category,
            stock,
            isFeatured
        } = req.body;

        // Check required fields
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Image URL from Cloudinary
        const image = req.file ? req.file.path : "";

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image,
            isFeatured
        });

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Product
const getSingleProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Agar new image upload hui hai
        if (req.file) {
            req.body.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product: updatedProduct,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Search Products
const searchProducts = async (req, res) => {
    try {

        const keyword = req.query.keyword;

        const products = await Product.find({
            name: {
                $regex: keyword,
                $options: "i"
            }
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Filter Products By Category
const filterProductsByCategory = async (req, res) => {
    try {

        const products = await Product.find({
            category: req.params.category
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Filter Products By Price
const filterProductsByPrice = async (req, res) => {
    try {

        const min = Number(req.query.min) || 0;
        const max = Number(req.query.max) || Number.MAX_SAFE_INTEGER;

        const products = await Product.find({
            price: {
                $gte: min,
                $lte: max
            }
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Sort Products
const sortProducts = async (req, res) => {
    try {

        const sort = req.query.sort;

        let sortOption = {};

        if (sort === "low") {
            sortOption = { price: 1 };
        } else if (sort === "high") {
            sortOption = { price: -1 };
        } else if (sort === "new") {
            sortOption = { createdAt: -1 };
        }

        const products = await Product.find().sort(sortOption);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Pagination
const paginateProducts = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments();

        const products = await Product.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
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

};