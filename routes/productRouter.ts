import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

// Routes for Product

// Create Product
router.post("/", async (req, res) => {
  try {
    await createProduct(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in creating product:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all Products
router.get("/", async (req, res) => {
  try {
    await getProducts(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching products:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get Product by ID
router.get("/:id", async (req, res) => {
  try {
    await getProductById(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching product by ID:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    await updateProduct(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in updating product:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in deleting product:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
