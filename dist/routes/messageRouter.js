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
const messageController_1 = require("../controllers/messageController");
const router = (0, express_1.Router)();
// Create Message (POST)
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, messageController_1.postMessage)(req, res);
    }
    catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message.",
            data: null,
        });
    }
}));
// Get Message by ID (GET)
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, messageController_1.getMessageById)(req, res);
    }
    catch (error) {
        console.error("Error fetching message:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch message.",
            data: null,
        });
    }
}));
// Get messages by user ID and type
router.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, messageController_1.getMessagesByUserId)(req, res);
    }
    catch (error) {
        console.error("Error fetching user messages:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages.",
            data: null,
        });
    }
}));
exports.default = router;
