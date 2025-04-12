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
const storeController_1 = require("../controllers/storeController");
const router = (0, express_1.Router)();
// Create Store
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, storeController_1.createStore)(req, res);
    }
    catch (error) {
        console.error("Error creating store:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create store.",
            data: null,
        });
    }
}));
// Get All Stores
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, storeController_1.getAllStores)(req, res);
    }
    catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch stores.",
            data: null,
        });
    }
}));
// Get Store by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, storeController_1.getStoreById)(req, res);
    }
    catch (error) {
        console.error("Error fetching store:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch store.",
            data: null,
        });
    }
}));
// Update Store
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, storeController_1.updateStore)(req, res);
    }
    catch (error) {
        console.error("Error updating store:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update store.",
            data: null,
        });
    }
}));
// Delete Store
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, storeController_1.deleteStore)(req, res);
    }
    catch (error) {
        console.error("Error deleting store:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete store.",
            data: null,
        });
    }
}));
exports.default = router;
