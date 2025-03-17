// src/routes/pickupManRoutes.ts
import { Router } from "express";
import {
  createPickupMan,
  getPickupMen,
  getPickupManById,
  updatePickupMan,
  deletePickupMan,
} from "../controllers/pickupmanController";

const router = Router();

// Routes for Pickup Man

// Create Pickup Man
router.post("/", async (req, res) => {
  try {
    await createPickupMan(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in creating pickup man:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all Pickup Men
router.get("/", async (req, res) => {
  try {
    await getPickupMen(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching pickup men:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get Pickup Man by ID
router.get("/:id", async (req, res) => {
  try {
    await getPickupManById(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching pickup man by ID:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update Pickup Man
router.put("/:id", async (req, res) => {
  try {
    await updatePickupMan(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in updating pickup man:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Delete Pickup Man
router.delete("/:id", async (req, res) => {
  try {
    await deletePickupMan(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in deleting pickup man:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
