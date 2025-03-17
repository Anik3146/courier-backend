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
// src/routes/agentRoutes.ts
const express_1 = require("express");
const agentController_1 = require("../controllers/agentController");
const router = (0, express_1.Router)();
// Routes for Agent
// Create Agent
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, agentController_1.createAgent)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in creating agent:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get all Agents
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, agentController_1.getAgents)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching agents:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get Agent by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, agentController_1.getAgentById)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching agent by ID:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Update Agent
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, agentController_1.updateAgent)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in updating agent:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Delete Agent
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, agentController_1.deleteAgent)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in deleting agent:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
