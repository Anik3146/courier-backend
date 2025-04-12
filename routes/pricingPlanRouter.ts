import { Router } from "express";
import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/pricingPlanController";

const router = Router();

// Create a Pricing Plan
router.post("/", async (req, res) => {
  try {
    await createPlan(req, res);
  } catch (error) {
    console.error("Error creating pricing plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create pricing plan.",
      data: null,
    });
  }
});

// Get All Pricing Plans
router.get("/", async (req, res) => {
  try {
    await getAllPlans(req, res);
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pricing plans.",
      data: null,
    });
  }
});

// Get Single Pricing Plan by ID
router.get("/:id", async (req, res) => {
  try {
    await getPlanById(req, res);
  } catch (error) {
    console.error("Error fetching pricing plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pricing plan.",
      data: null,
    });
  }
});

// Update Pricing Plan by ID
router.put("/:id", async (req, res) => {
  try {
    await updatePlan(req, res);
  } catch (error) {
    console.error("Error updating pricing plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update pricing plan.",
      data: null,
    });
  }
});

// Delete Pricing Plan by ID
router.delete("/:id", async (req, res) => {
  try {
    await deletePlan(req, res);
  } catch (error) {
    console.error("Error deleting pricing plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete pricing plan.",
      data: null,
    });
  }
});

export default router;
