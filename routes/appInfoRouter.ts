import express from "express";
import {
  addOrUpdateAppInfoForEntity,
  getAppInfoByEntityId,
} from "../controllers/appInfoController";

const router = express.Router();

// ✅ PUT Request (Add or Update App Info - same as POST)
router.put("/:userId", async (req, res) => {
  try {
    await addOrUpdateAppInfoForEntity(req, res); // Handle both add and update in one place
  } catch (error) {
    console.error("Error adding/updating app info:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add/update app info.",
      data: null,
    });
  }
});

// ✅ GET Request: Get App Info by Entity ID
router.get("/:userId", async (req, res) => {
  try {
    await getAppInfoByEntityId(req, res);
  } catch (error) {
    console.error("Error fetching app info:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch app info.",
      data: null,
    });
  }
});

export default router;
