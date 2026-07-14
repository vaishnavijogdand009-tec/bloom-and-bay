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

module.exports = {
    getAllProducts,
    addProduct  
};