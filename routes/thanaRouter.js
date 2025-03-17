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
// src/routes/thanaRoutes.ts
const express_1 = require("express");
const thanaController_1 = require("../controllers/thanaController");
const router = (0, express_1.Router)();
// Routes for Thana
// Create Thana
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, thanaController_1.createThana)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in creating thana:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get all Thanas
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, thanaController_1.getThanas)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching thanas:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get Thana by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, thanaController_1.getThanaById)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching thana by ID:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Update Thana
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, thanaController_1.updateThana)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in updating thana:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Delete Thana
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, thanaController_1.deleteThana)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in deleting thana:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
