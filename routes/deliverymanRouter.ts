// src/routes/deliveryManRoutes.ts
import { Router } from "express";
import {
  createDeliveryMan,
  getDeliveryMen,
  getDeliveryManById,
  updateDeliveryMan,
  deleteDeliveryMan,
} from "../controllers/deliverymanController";

const router = Router();

// Routes for Delivery Man

// Create Delivery Man
router.post("/", async (req, res) => {
  try {
    await createDeliveryMan(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in creating delivery man:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all Delivery Men
router.get("/", async (req, res) => {
  try {
    await getDeliveryMen(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching delivery men:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get Delivery Man by ID
router.get("/:id", async (req, res) => {
  try {
    await getDeliveryManById(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching delivery man by ID:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update Delivery Man
router.put("/:id", async (req, res) => {
  try {
    await updateDeliveryMan(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in updating delivery man:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Delete Delivery Man
router.delete("/:id", async (req, res) => {
  try {
    await deleteDeliveryMan(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in deleting delivery man:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
