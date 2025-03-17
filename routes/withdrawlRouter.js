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
// src/routes/withdrawalRoutes.ts
const express_1 = require("express");
const withdrawlController_1 = require("../controllers/withdrawlController");
const router = (0, express_1.Router)();
// Routes for Withdrawal
// Create Withdrawal
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, withdrawlController_1.createWithdrawal)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in creating withdrawal:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get all Withdrawals
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, withdrawlController_1.getWithdrawals)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching withdrawals:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get Withdrawal by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, withdrawlController_1.getWithdrawalById)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching withdrawal by ID:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Update Withdrawal
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, withdrawlController_1.updateWithdrawal)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in updating withdrawal:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Delete Withdrawal
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, withdrawlController_1.deleteWithdrawal)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in deleting withdrawal:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
