import Product from "../models/Product.js";

// Create product
export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// export const createProduct = async (req, res) => {
//   try {
//     const { name, shortDescription, price } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Image file is required" });
//     }

//     const product = await Product.create({
//       name,
//       shortDescription,
//       price,
//       image: "/uploads/" + req.file.filename,
//     });

//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating product", error: err });
//   }
// };


// Get all products
export async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Update product
export async function updateProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// export const updateProduct = async (req, res) => {
//   try {
//     const { name, shortDescription, price } = req.body;

//     const updateData = { name, shortDescription, price };

//     if (req.file) {
//       updateData.image = "/uploads/" + req.file.filename;
//     }

//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating product", error: err });
//   }
// };


// Delete product
export async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
