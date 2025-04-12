// src/routes/deliveryRoutes.ts
import { Router } from "express";
import {
  createDelivery,
  getActiveDeliveries,
  getAllDeliveries,
  getDeliveryStageBreakdown,
  getReturnedDeliveries,
  getReverseDeliveries,
  updateDeliveryStatus,
} from "../controllers/deliveryController";

const router = Router();

// Create a new Delivery
router.post("/", async (req, res) => {
  try {
    await createDelivery(req, res); // Call the controller function
  } catch (error) {
    console.error("Error in creating delivery:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update Delivery Status (Pickup and Delivery)
router.put("/:id", async (req, res) => {
  try {
    await updateDeliveryStatus(req, res); // Call the controller function
  } catch (error) {
    console.error("Error in updating delivery status:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all deliveries
router.get("/", async (req, res) => {
  try {
    await getAllDeliveries(req, res);
  } catch (error) {
    console.error("Error in getAllDeliveries:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get active deliveries (statuses: At Sorting, In Transit, etc.)
router.get("/active", async (req, res) => {
  try {
    await getActiveDeliveries(req, res);
  } catch (error) {
    console.error("Error in getActiveDeliveries:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get returned deliveries
router.get("/returned", async (req, res) => {
  try {
    await getReturnedDeliveries(req, res);
  } catch (error) {
    console.error("Error in getReturnedDeliveries:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get reverse deliveries
router.get("/reverse", async (req, res) => {
  try {
    await getReverseDeliveries(req, res);
  } catch (error) {
    console.error("Error in getReverseDeliveries:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get return percentage breakdown
router.get("/returns/percentage", async (req, res) => {
  try {
    await getDeliveryStageBreakdown(req, res);
  } catch (error) {
    console.error("Error in getReturnBreakdown:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
