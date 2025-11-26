const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  
  // Remove leading slash if present and construct full path
  const filePath = imagePath.startsWith("/")
    ? path.join(__dirname, "..", imagePath)
    : path.join(__dirname, "..", "uploads", imagePath);
  
  // Check if file exists and delete
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted image: ${filePath}`);
    } catch (err) {
      console.error(`Error deleting image ${filePath}:`, err.message);
    }
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, shortDescription, price } = req.body;

    // Validation
    if (!name || !shortDescription || !price) {
      // If file was uploaded but validation fails, delete it
      if (req.file) {
        deleteImageFile(req.file.path);
      }
      return res.status(400).json({
        message: "All fields are required",
        errors: {
          name: !name ? "Product name is required" : undefined,
          shortDescription: !shortDescription ? "Short description is required" : undefined,
          price: !price ? "Price is required" : undefined,
        },
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
        errors: { image: "Please upload an image file" },
      });
    }

    // Validate price
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      deleteImageFile(req.file.path);
      return res.status(400).json({
        message: "Invalid price",
        errors: { price: "Price must be a positive number" },
      });
    }

    // Create product with image path
    const product = await Product.create({
      name: name.trim(),
      shortDescription: shortDescription.trim(),
      price: priceNum,
      image: `/uploads/${req.file.filename}`, // Store relative path
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    // Delete uploaded file if product creation fails
    if (req.file) {
      deleteImageFile(req.file.path);
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      message: "Error creating product",
      error: err.message,
    });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    // Support for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    // Support for search
    const search = req.query.search || "";
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { shortDescription: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Support for sorting
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    // Execute query
    const [products, total] = await Promise.all([
      Product.find(searchQuery)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(), // Use lean() for better performance
      Product.countDocuments(searchQuery),
    ]);

    res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching products",
      error: err.message,
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }
    res.status(500).json({
      message: "Error fetching product",
      error: err.message,
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, shortDescription, price } = req.body;
    const productId = req.params.id;

    // Find existing product
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      // If new file was uploaded but product doesn't exist, delete it
      if (req.file) {
        deleteImageFile(req.file.path);
      }
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Prepare update data
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (shortDescription !== undefined)
      updateData.shortDescription = shortDescription.trim();
    if (price !== undefined) {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum < 0) {
        if (req.file) {
          deleteImageFile(req.file.path);
        }
        return res.status(400).json({
          message: "Invalid price",
          errors: { price: "Price must be a positive number" },
        });
      }
      updateData.price = priceNum;
    }

    // Handle image update
    if (req.file) {
      // Delete old image file
      deleteImageFile(existingProduct.image);
      // Set new image path
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    // Delete uploaded file if update fails
    if (req.file) {
      deleteImageFile(req.file.path);
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      message: "Error updating product",
      error: err.message,
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find product to get image path
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete product from database
    await Product.findByIdAndDelete(productId);

    // Delete associated image file
    deleteImageFile(product.image);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }
    res.status(500).json({
      message: "Error deleting product",
      error: err.message,
    });
  }
};
