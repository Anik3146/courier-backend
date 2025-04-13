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
const promoController_1 = require("../controllers/promoController");
const router = (0, express_1.Router)();
// Create Promo
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promoController_1.createPromo)(req, res);
    }
    catch (error) {
        console.error("Error creating promo:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create promo.",
            data: null,
        });
    }
}));
// Get All Promos
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promoController_1.getAllPromos)(req, res);
    }
    catch (error) {
        console.error("Error fetching promos:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch promos.",
            data: null,
        });
    }
}));
// Get Promo by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promoController_1.getPromoById)(req, res);
    }
    catch (error) {
        console.error("Error fetching promo:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch promo.",
            data: null,
        });
    }
}));
// Update Promo
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promoController_1.updatePromo)(req, res);
    }
    catch (error) {
        console.error("Error updating promo:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update promo.",
            data: null,
        });
    }
}));
// Delete Promo
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promoController_1.deletePromo)(req, res);
    }
    catch (error) {
        console.error("Error deleting promo:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete promo.",
            data: null,
        });
    }
}));
exports.default = router;
