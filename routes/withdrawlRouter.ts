// src/routes/withdrawalRoutes.ts
import { Router } from "express";
import {
  createWithdrawal,
  getWithdrawals,
  getWithdrawalById,
  updateWithdrawal,
  deleteWithdrawal,
} from "../controllers/withdrawlController";

const router = Router();

// Routes for Withdrawal

// Create Withdrawal
router.post("/", async (req, res) => {
  try {
    await createWithdrawal(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in creating withdrawal:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all Withdrawals
router.get("/", async (req, res) => {
  try {
    await getWithdrawals(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching withdrawals:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get Withdrawal by ID
router.get("/:id", async (req, res) => {
  try {
    await getWithdrawalById(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching withdrawal by ID:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update Withdrawal
router.put("/:id", async (req, res) => {
  try {
    await updateWithdrawal(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in updating withdrawal:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Delete Withdrawal
router.delete("/:id", async (req, res) => {
  try {
    await deleteWithdrawal(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in deleting withdrawal:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
