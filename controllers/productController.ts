import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; // Ensure AppDataSource is correctly initialized
import { Product } from "../entities/Products";

// Create Product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { product_name, product_type } = req.body;

  if (!product_name || !product_type) {
    return res.status(400).json({
      success: false,
      message: "Product name and type are required",
      data: {},
    });
  }

  try {
    const product = new Product();
    product.product_name = product_name;
    product.product_type = product_type;

    // Save the new product
    await AppDataSource.manager.save(Product, product);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      data: {},
    });
  }
};

// Get all Products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await AppDataSource.manager.find(Product);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      data: {},
    });
  }
};

// Get Product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      data: {},
    });
  }
};

// Update Product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { product_name, product_type } = req.body;

  try {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: {},
      });
    }

    product.product_name = product_name || product.product_name;
    product.product_type = product_type || product.product_type;

    const updatedProduct = await AppDataSource.manager.save(Product, product);
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      data: {},
    });
  }
};

// Delete Product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: {},
      });
    }

    await AppDataSource.manager.remove(Product, product);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      data: {},
    });
  }
};
