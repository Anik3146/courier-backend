import express from "express";
import {
  addActivityLogForEntity,
  getActivityLogsByEntityId,
} from "../controllers/activityLogController";

const router = express.Router();

router.post("/:userId", async (req, res) => {
  try {
    await addActivityLogForEntity(req, res);
  } catch (error) {
    console.error("Error adding activity log:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add activity log.",
      data: null,
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    await getActivityLogsByEntityId(req, res);
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch activity logs.",
      data: null,
    });
  }
});

export default router;
