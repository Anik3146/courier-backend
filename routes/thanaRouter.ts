// src/routes/thanaRoutes.ts
import { Router } from "express";
import {
  createThana,
  getThanas,
  getThanaById,
  updateThana,
  deleteThana,
} from "../controllers/thanaController";

const router = Router();

// Routes for Thana

// Create Thana
router.post("/", async (req, res) => {
  try {
    await createThana(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in creating thana:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all Thanas
router.get("/", async (req, res) => {
  try {
    await getThanas(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching thanas:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get Thana by ID
router.get("/:id", async (req, res) => {
  try {
    await getThanaById(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching thana by ID:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update Thana
router.put("/:id", async (req, res) => {
  try {
    await updateThana(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in updating thana:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Delete Thana
router.delete("/:id", async (req, res) => {
  try {
    await deleteThana(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in deleting thana:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
