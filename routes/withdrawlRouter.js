"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const withdrawlController_1 = require("../controllers/withdrawlController");
const router = (0, express_1.Router)();
// Routes for Withdrawal
// Create Withdrawal
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the controller function to handle the withdrawal logic
        yield (0, withdrawlController_1.createWithdrawal)(req, res);
    }
    catch (error) {
        console.error("Error in creating withdrawal:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// // Get all Withdrawals
// router.get("/", async (req, res) => {
//   try {
//     // Call the controller function to get all withdrawals
//     await getWithdrawals(req, res);
//   } catch (error) {
//     console.error("Error in fetching withdrawals:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });
// // Get Withdrawal by ID
// router.get("/:id", async (req, res) => {
//   try {
//     // Call the controller function to get a withdrawal by ID
//     await getWithdrawalById(req, res);
//   } catch (error) {
//     console.error("Error in fetching withdrawal by ID:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });
// // Update Withdrawal
// router.put("/:id", async (req, res) => {
//   try {
//     // Call the controller function to update the withdrawal status
//     await updateWithdrawal(req, res);
//   } catch (error) {
//     console.error("Error in updating withdrawal:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });
// // Delete Withdrawal
// router.delete("/:id", async (req, res) => {
//   try {
//     // Call the controller function to delete a withdrawal
//     await deleteWithdrawal(req, res);
//   } catch (error) {
//     console.error("Error in deleting withdrawal:", error);
//     res.status(500).json({ message: "An unexpected error occurred." });
//   }
// });
exports.default = router;
