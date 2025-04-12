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
const areaController_1 = require("../controllers/areaController");
const router = (0, express_1.Router)();
// Create Area
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, areaController_1.createArea)(req, res);
    }
    catch (error) {
        console.error("Error creating area:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create area.",
            data: null,
        });
    }
}));
// Get All Areas
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, areaController_1.getAllAreas)(req, res);
    }
    catch (error) {
        console.error("Error fetching areas:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch areas.",
            data: null,
        });
    }
}));
// Get Area by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, areaController_1.getAreaById)(req, res);
    }
    catch (error) {
        console.error("Error fetching area:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch area.",
            data: null,
        });
    }
}));
// Update Area
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, areaController_1.updateArea)(req, res);
    }
    catch (error) {
        console.error("Error updating area:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update area.",
            data: null,
        });
    }
}));
// Delete Area
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, areaController_1.deleteArea)(req, res);
    }
    catch (error) {
        console.error("Error deleting area:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete area.",
            data: null,
        });
    }
}));
exports.default = router;
