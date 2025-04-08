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
// src/routes/pickupManRoutes.ts
const express_1 = require("express");
const pickupmanController_1 = require("../controllers/pickupmanController");
const router = (0, express_1.Router)();
// Routes for Pickup Man
// Create Pickup Man
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pickupmanController_1.createPickupMan)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in creating pickup man:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get all Pickup Men
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pickupmanController_1.getPickupMen)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching pickup men:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get Pickup Man by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pickupmanController_1.getPickupManById)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching pickup man by ID:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Update Pickup Man
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pickupmanController_1.updatePickupMan)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in updating pickup man:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Delete Pickup Man
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, pickupmanController_1.deletePickupMan)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in deleting pickup man:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
