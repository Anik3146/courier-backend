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
const pricingPlanController_1 = require("../controllers/pricingPlanController");
const router = (0, express_1.Router)();
// Create a Pricing Plan
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pricingPlanController_1.createPlan)(req, res);
    }
    catch (error) {
        console.error("Error creating pricing plan:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create pricing plan.",
            data: null,
        });
    }
}));
// Get All Pricing Plans
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pricingPlanController_1.getAllPlans)(req, res);
    }
    catch (error) {
        console.error("Error fetching pricing plans:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch pricing plans.",
            data: null,
        });
    }
}));
// Get Single Pricing Plan by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pricingPlanController_1.getPlanById)(req, res);
    }
    catch (error) {
        console.error("Error fetching pricing plan:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch pricing plan.",
            data: null,
        });
    }
}));
// Update Pricing Plan by ID
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pricingPlanController_1.updatePlan)(req, res);
    }
    catch (error) {
        console.error("Error updating pricing plan:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update pricing plan.",
            data: null,
        });
    }
}));
// Delete Pricing Plan by ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pricingPlanController_1.deletePlan)(req, res);
    }
    catch (error) {
        console.error("Error deleting pricing plan:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete pricing plan.",
            data: null,
        });
    }
}));
exports.default = router;
