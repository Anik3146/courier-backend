import { Router } from "express";
import {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
} from "../controllers/zoneController";

const router = Router();

// Create Zone
router.post("/", async (req, res) => {
  try {
    await createZone(req, res);
  } catch (error) {
    console.error("Error creating zone:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create zone.",
      data: null,
    });
  }
});

// Get All Zones
router.get("/", async (req, res) => {
  try {
    await getAllZones(req, res);
  } catch (error) {
    console.error("Error fetching zones:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch zones.",
      data: null,
    });
  }
});

// Get Zone by ID
router.get("/:id", async (req, res) => {
  try {
    await getZoneById(req, res);
  } catch (error) {
    console.error("Error fetching zone:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch zone.",
      data: null,
    });
  }
});

// Update Zone
router.put("/:id", async (req, res) => {
  try {
    await updateZone(req, res);
  } catch (error) {
    console.error("Error updating zone:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update zone.",
      data: null,
    });
  }
});

// Delete Zone
router.delete("/:id", async (req, res) => {
  try {
    await deleteZone(req, res);
  } catch (error) {
    console.error("Error deleting zone:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete zone.",
      data: null,
    });
  }
});

export default router;
