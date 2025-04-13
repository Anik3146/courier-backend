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
const activityLogController_1 = require("../controllers/activityLogController");
const router = express_1.default.Router();
router.post("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, activityLogController_1.addActivityLogForEntity)(req, res);
    }
    catch (error) {
        console.error("Error adding activity log:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add activity log.",
            data: null,
        });
    }
}));
router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, activityLogController_1.getActivityLogsByEntityId)(req, res);
    }
    catch (error) {
        console.error("Error fetching activity logs:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch activity logs.",
            data: null,
        });
    }
}));
exports.default = router;
