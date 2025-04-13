import { Router } from "express";
import {
  createOperator,
  getAllOperators,
  getOperatorById,
  updateOperator,
  deleteOperator,
} from "../controllers/operatorController";

const router = Router();

// Create Operator
router.post("/", async (req, res) => {
  try {
    await createOperator(req, res);
  } catch (error) {
    console.error("Error creating operator:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create operator.",
      data: null,
    });
  }
});

// Get All Operators
router.get("/", async (req, res) => {
  try {
    await getAllOperators(req, res);
  } catch (error) {
    console.error("Error fetching operators:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch operators.",
      data: null,
    });
  }
});

// Get Operator by ID
router.get("/:id", async (req, res) => {
  try {
    await getOperatorById(req, res);
  } catch (error) {
    console.error("Error fetching operator:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch operator.",
      data: null,
    });
  }
});

// Update Operator
router.put("/:id", async (req, res) => {
  try {
    await updateOperator(req, res);
  } catch (error) {
    console.error("Error updating operator:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update operator.",
      data: null,
    });
  }
});

// Delete Operator
router.delete("/:id", async (req, res) => {
  try {
    await deleteOperator(req, res);
  } catch (error) {
    console.error("Error deleting operator:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete operator.",
      data: null,
    });
  }
});

export default router;
