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
// src/routes/deliveryRoutes.ts
const express_1 = require("express");
const deliveryController_1 = require("../controllers/deliveryController");
const router = (0, express_1.Router)();
// Create a new Delivery
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryController_1.createDelivery)(req, res); // Call the controller function
    }
    catch (error) {
        console.error("Error in creating delivery:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Update Delivery Status (Pickup and Delivery)
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryController_1.updateDeliveryStatus)(req, res); // Call the controller function
    }
    catch (error) {
        console.error("Error in updating delivery status:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get all deliveries
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryController_1.getAllDeliveries)(req, res);
    }
    catch (error) {
        console.error("Error in getAllDeliveries:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get active deliveries (statuses: At Sorting, In Transit, etc.)
router.get("/active", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryController_1.getActiveDeliveries)(req, res);
    }
    catch (error) {
        console.error("Error in getActiveDeliveries:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get returned deliveries
router.get("/returned", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryController_1.getReturnedDeliveries)(req, res);
    }
    catch (error) {
        console.error("Error in getReturnedDeliveries:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get reverse deliveries
router.get("/reverse", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryController_1.getReverseDeliveries)(req, res);
    }
    catch (error) {
        console.error("Error in getReverseDeliveries:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get return percentage breakdown
router.get("/returns/percentage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryController_1.getDeliveryStageBreakdown)(req, res);
    }
    catch (error) {
        console.error("Error in getReturnBreakdown:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
