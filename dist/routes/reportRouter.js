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
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
// Routes for Report
// Create Report
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, reportController_1.createReport)(req, res);
    }
    catch (error) {
        console.error("Error in creating report:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get All Reports
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, reportController_1.getReports)(req, res);
    }
    catch (error) {
        console.error("Error in fetching reports:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Delete Report by ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, reportController_1.deleteReport)(req, res);
    }
    catch (error) {
        console.error("Error in deleting report:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
