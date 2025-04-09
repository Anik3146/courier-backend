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
exports.deleteAgent = exports.updateAgent = exports.getAgentById = exports.getAgents = exports.createAgent = void 0;
const data_source_1 = require("../data-source");
const Agent_1 = require("../entities/Agent");
// Create Agent
const createAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, balance, thanaId } = req.body;
    if (!name || !thanaId) {
        return res
            .status(400)
            .json({
            success: false,
            message: "Name and Thana are required",
            data: {},
        });
    }
    try {
        const agent = new Agent_1.Agent();
        agent.name = name;
        agent.balance = balance || 0;
        agent.thana = { id: thanaId }; // Assuming thanaId is provided
        yield data_source_1.AppDataSource.manager.save(agent);
        return res
            .status(201)
            .json({
            success: true,
            message: "Agent created successfully",
            data: agent,
        });
    }
    catch (error) {
        console.error("Error creating agent:", error);
        return res
            .status(500)
            .json({ success: false, message: "Error creating agent", data: {} });
    }
});
exports.createAgent = createAgent;
// Get all Agents
const getAgents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agents = yield data_source_1.AppDataSource.manager.find(Agent_1.Agent, {
            relations: ["thana"],
        });
        return res
            .status(200)
            .json({
            success: true,
            message: "Agents fetched successfully",
            data: agents,
        });
    }
    catch (error) {
        console.error("Error fetching agents:", error);
        return res
            .status(500)
            .json({ success: false, message: "Error fetching agents", data: [] });
    }
});
exports.getAgents = getAgents;
// Get Agent by ID
const getAgentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
            where: { id: Number(id) },
            relations: ["thana", "pickupMen", "deliveryMen", "deliveries"],
        });
        if (!agent) {
            return res
                .status(404)
                .json({ success: false, message: "Agent not found", data: {} });
        }
        return res
            .status(200)
            .json({
            success: true,
            message: "Agent fetched successfully",
            data: agent,
        });
    }
    catch (error) {
        console.error("Error fetching agent by ID:", error);
        return res
            .status(500)
            .json({ success: false, message: "Error fetching agent", data: {} });
    }
});
exports.getAgentById = getAgentById;
// Update Agent
const updateAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, balance, thanaId } = req.body;
    try {
        const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
            where: { id: Number(id) },
        });
        if (!agent) {
            return res
                .status(404)
                .json({ success: false, message: "Agent not found", data: {} });
        }
        agent.name = name || agent.name;
        agent.balance = balance || agent.balance;
        if (thanaId) {
            agent.thana = { id: thanaId }; // Assuming thanaId is provided
        }
        yield data_source_1.AppDataSource.manager.save(agent);
        return res
            .status(200)
            .json({
            success: true,
            message: "Agent updated successfully",
            data: agent,
        });
    }
    catch (error) {
        console.error("Error updating agent:", error);
        return res
            .status(500)
            .json({ success: false, message: "Error updating agent", data: {} });
    }
});
exports.updateAgent = updateAgent;
// Delete Agent
const deleteAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
            where: { id: Number(id) },
        });
        if (!agent) {
            return res
                .status(404)
                .json({ success: false, message: "Agent not found", data: {} });
        }
        yield data_source_1.AppDataSource.manager.remove(agent);
        return res
            .status(200)
            .json({ success: true, message: "Agent deleted successfully", data: {} });
    }
    catch (error) {
        console.error("Error deleting agent:", error);
        return res
            .status(500)
            .json({ success: false, message: "Error deleting agent", data: {} });
    }
});
exports.deleteAgent = deleteAgent;
