import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; // Ensure AppDataSource is correctly initialized
import { Product } from "../entities/Products";

export const createProduct = async (req: Request, res: Response) => {
  const { product_name, product_type } = req.body;

  if (!product_name || !product_type) {
    return res
      .status(400)
      .json({ message: "Product name and type are required" });
  }

  try {
    const product = new Product();
    product.product_name = product_name;
    product.product_type = product_type;

    // Save the new product
    await AppDataSource.manager.save(Product, product);
    return res.status(201).json(product);
  } catch (error) {
    console.error("Error saving product:", error);
    return res.status(500).json({ message: "Failed to create product" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await AppDataSource.manager.find(Product);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_name, product_type } = req.body;

  try {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.product_name = product_name || product.product_name;
    product.product_type = product_type || product.product_type;

    const updatedProduct = await AppDataSource.manager.save(Product, product);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await AppDataSource.manager.remove(Product, product);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};
