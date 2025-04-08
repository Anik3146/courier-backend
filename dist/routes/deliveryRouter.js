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
exports.default = router;
