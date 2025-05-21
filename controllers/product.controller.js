import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error fetching product", error.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body;
  console.log(`product received`, { product });
  if (!product.name || !product.price) {
    return res
      .status(400)
      .json({ success: false, message: "missing product name or price" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (err) {
    console.error("ERROR creating product", err.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "ID not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    console.error("ERROR updating product", err.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};
