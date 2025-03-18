import { Router } from "express";
import {
  createWithdrawal,
  completeWithdrawal,
} from "../controllers/withdrawlController";

const router = Router();

// Routes for Withdrawal

// Create Withdrawal
router.post("/", async (req, res) => {
  try {
    // Call the controller function to handle the withdrawal logic
    await createWithdrawal(req, res);
  } catch (error) {
    console.error("Error in creating withdrawal:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Complete Withdrawal (update status to 'completed' and update user balance)
router.put("/complete", async (req, res) => {
  try {
    // Call the controller function to handle the completion logic
    await completeWithdrawal(req, res);
  } catch (error) {
    console.error("Error in completing withdrawal:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all Withdrawals - Uncomment if needed
// router.get("/", async (req, res) => {
//   try {
//     // Call the controller function to get all withdrawals
//     await getWithdrawals(req, res);
//   } catch (error) {
//     console.error("Error in fetching withdrawals:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });

// Get Withdrawal by ID - Uncomment if needed
// router.get("/:id", async (req, res) => {
//   try {
//     // Call the controller function to get a withdrawal by ID
//     await getWithdrawalById(req, res);
//   } catch (error) {
//     console.error("Error in fetching withdrawal by ID:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });

// Update Withdrawal - Uncomment if needed
// router.put("/:id", async (req, res) => {
//   try {
//     // Call the controller function to update the withdrawal status
//     await updateWithdrawal(req, res);
//   } catch (error) {
//     console.error("Error in updating withdrawal:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });

// Delete Withdrawal - Uncomment if needed
// router.delete("/:id", async (req, res) => {
//   try {
//     // Call the controller function to delete a withdrawal
//     await deleteWithdrawal(req, res);
//   } catch (error) {
//     console.error("Error in deleting withdrawal:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });

export default router;
