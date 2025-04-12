import { Router } from "express";
import {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} from "../controllers/areaController";

const router = Router();

// Create Area
router.post("/", async (req, res) => {
  try {
    await createArea(req, res);
  } catch (error) {
    console.error("Error creating area:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create area.",
      data: null,
    });
  }
});

// Get All Areas
router.get("/", async (req, res) => {
  try {
    await getAllAreas(req, res);
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch areas.",
      data: null,
    });
  }
});

// Get Area by ID
router.get("/:id", async (req, res) => {
  try {
    await getAreaById(req, res);
  } catch (error) {
    console.error("Error fetching area:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch area.",
      data: null,
    });
  }
});

// Update Area
router.put("/:id", async (req, res) => {
  try {
    await updateArea(req, res);
  } catch (error) {
    console.error("Error updating area:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update area.",
      data: null,
    });
  }
});

// Delete Area
router.delete("/:id", async (req, res) => {
  try {
    await deleteArea(req, res);
  } catch (error) {
    console.error("Error deleting area:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete area.",
      data: null,
    });
  }
});

export default router;
