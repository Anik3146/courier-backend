import express from "express";
import {
  addOrUpdateDeviceInfoForEntity,
  getDeviceInfoByEntityId,
} from "../controllers/deviceInfoController";

const router = express.Router();

// ✅ PUT Request: Add or Update Device Info (same as POST)
router.put("/:userId", async (req, res) => {
  try {
    await addOrUpdateDeviceInfoForEntity(req, res); // Handle both add and update
  } catch (error) {
    console.error("Error adding/updating device info:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add/update device info.",
      data: null,
    });
  }
});

// ✅ GET Request: Get Device Info by Entity
router.get("/:userId", async (req, res) => {
  try {
    await getDeviceInfoByEntityId(req, res); // Get Device Info for the entity
  } catch (error) {
    console.error("Error fetching device info:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch device info.",
      data: null,
    });
  }
});

export default router;
