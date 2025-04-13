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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deviceInfoController_1 = require("../controllers/deviceInfoController");
const router = express_1.default.Router();
// ✅ PUT Request: Add or Update Device Info (same as POST)
router.put("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deviceInfoController_1.addOrUpdateDeviceInfoForEntity)(req, res); // Handle both add and update
    }
    catch (error) {
        console.error("Error adding/updating device info:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add/update device info.",
            data: null,
        });
    }
}));
// ✅ GET Request: Get Device Info by Entity
router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, deviceInfoController_1.getDeviceInfoByEntityId)(req, res); // Get Device Info for the entity
    }
    catch (error) {
        console.error("Error fetching device info:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch device info.",
            data: null,
        });
    }
}));
exports.default = router;
