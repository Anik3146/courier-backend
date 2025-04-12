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
const zoneController_1 = require("../controllers/zoneController");
const router = (0, express_1.Router)();
// Create Zone
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, zoneController_1.createZone)(req, res);
    }
    catch (error) {
        console.error("Error creating zone:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create zone.",
            data: null,
        });
    }
}));
// Get All Zones
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, zoneController_1.getAllZones)(req, res);
    }
    catch (error) {
        console.error("Error fetching zones:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch zones.",
            data: null,
        });
    }
}));
// Get Zone by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, zoneController_1.getZoneById)(req, res);
    }
    catch (error) {
        console.error("Error fetching zone:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch zone.",
            data: null,
        });
    }
}));
// Update Zone
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, zoneController_1.updateZone)(req, res);
    }
    catch (error) {
        console.error("Error updating zone:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update zone.",
            data: null,
        });
    }
}));
// Delete Zone
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, zoneController_1.deleteZone)(req, res);
    }
    catch (error) {
        console.error("Error deleting zone:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete zone.",
            data: null,
        });
    }
}));
exports.default = router;
