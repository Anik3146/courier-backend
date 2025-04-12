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
const districtController_1 = require("../controllers/districtController");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, districtController_1.createDistrict)(req, res);
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error creating district", data: null });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, districtController_1.getAllDistricts)(req, res);
    }
    catch (error) {
        res
            .status(500)
            .json({
            success: false,
            message: "Error fetching districts",
            data: null,
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, districtController_1.getDistrictById)(req, res);
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching district", data: null });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, districtController_1.updateDistrict)(req, res);
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error updating district", data: null });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, districtController_1.deleteDistrict)(req, res);
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error deleting district", data: null });
    }
}));
exports.default = router;
