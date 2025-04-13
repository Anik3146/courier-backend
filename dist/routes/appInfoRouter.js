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
const appInfoController_1 = require("../controllers/appInfoController");
const router = express_1.default.Router();
// ✅ PUT Request (Add or Update App Info - same as POST)
router.put("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, appInfoController_1.addOrUpdateAppInfoForEntity)(req, res); // Handle both add and update in one place
    }
    catch (error) {
        console.error("Error adding/updating app info:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add/update app info.",
            data: null,
        });
    }
}));
// ✅ GET Request: Get App Info by Entity ID
router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, appInfoController_1.getAppInfoByEntityId)(req, res);
    }
    catch (error) {
        console.error("Error fetching app info:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch app info.",
            data: null,
        });
    }
}));
exports.default = router;
