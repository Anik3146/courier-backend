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
const deliveryChargesController_1 = require("../controllers/deliveryChargesController");
const router = (0, express_1.Router)();
// Routes for Delivery Charges
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryChargesController_1.createDeliveryCharge)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in delivery charge route:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryChargesController_1.getDeliveryCharges)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching delivery charges:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryChargesController_1.getDeliveryChargeById)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching delivery charge by ID:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryChargesController_1.updateDeliveryCharge)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in updating delivery charge:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deliveryChargesController_1.deleteDeliveryCharge)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in deleting delivery charge:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
