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
// src/routes/deliveryManRoutes.ts
const express_1 = require("express");
const deliverymanController_1 = require("../controllers/deliverymanController");
const router = (0, express_1.Router)();
// Routes for Delivery Man
// Create Delivery Man
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliverymanController_1.createDeliveryMan)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in creating delivery man:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get all Delivery Men
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliverymanController_1.getDeliveryMen)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching delivery men:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get Delivery Man by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliverymanController_1.getDeliveryManById)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching delivery man by ID:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Update Delivery Man
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliverymanController_1.updateDeliveryMan)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in updating delivery man:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Delete Delivery Man
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliverymanController_1.deleteDeliveryMan)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in deleting delivery man:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
