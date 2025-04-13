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
const operatorController_1 = require("../controllers/operatorController");
const router = (0, express_1.Router)();
// Create Operator
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, operatorController_1.createOperator)(req, res);
    }
    catch (error) {
        console.error("Error creating operator:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create operator.",
            data: null,
        });
    }
}));
// Get All Operators
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, operatorController_1.getAllOperators)(req, res);
    }
    catch (error) {
        console.error("Error fetching operators:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch operators.",
            data: null,
        });
    }
}));
// Get Operator by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, operatorController_1.getOperatorById)(req, res);
    }
    catch (error) {
        console.error("Error fetching operator:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch operator.",
            data: null,
        });
    }
}));
// Update Operator
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, operatorController_1.updateOperator)(req, res);
    }
    catch (error) {
        console.error("Error updating operator:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update operator.",
            data: null,
        });
    }
}));
// Delete Operator
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, operatorController_1.deleteOperator)(req, res);
    }
    catch (error) {
        console.error("Error deleting operator:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete operator.",
            data: null,
        });
    }
}));
exports.default = router;
