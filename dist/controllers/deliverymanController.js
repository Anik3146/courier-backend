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
exports.deleteDeliveryMan = exports.updateDeliveryMan = exports.getDeliveryManById = exports.getDeliveryMen = exports.createDeliveryMan = void 0;
const data_source_1 = require("../data-source");
const DeliveryMan_1 = require("../entities/DeliveryMan");
const Agent_1 = require("../entities/Agent");
const Thana_1 = require("../entities/Thana");
// Create DeliveryMan
const createDeliveryMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, balance, agentId, thanaId } = req.body;
    if (!name || balance === undefined || !agentId || !thanaId) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, balance, agent, thana) are required",
            data: {},
        });
    }
    try {
        // Find associated Agent and Thana
        const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
            where: { id: agentId },
        });
        const thana = yield data_source_1.AppDataSource.manager.findOne(Thana_1.Thana, {
            where: { id: thanaId },
        });
        if (!agent || !thana) {
            return res.status(404).json({
                success: false,
                message: "Agent or Thana not found",
                data: {},
            });
        }
        const deliveryMan = new DeliveryMan_1.DeliveryMan();
        deliveryMan.name = name;
        deliveryMan.balance = balance;
        deliveryMan.agent = agent;
        deliveryMan.thana = thana;
        // Save the new delivery man to the database
        yield data_source_1.AppDataSource.manager.save(deliveryMan);
        return res.status(201).json({
            success: true,
            message: "Delivery Man created successfully",
            data: deliveryMan,
        });
    }
    catch (error) {
        console.error("Error creating delivery man:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating delivery man",
            data: {},
        });
    }
});
exports.createDeliveryMan = createDeliveryMan;
// Get all DeliveryMen
const getDeliveryMen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryMen = yield data_source_1.AppDataSource.manager.find(DeliveryMan_1.DeliveryMan, {
            relations: ["agent", "thana"], // Fetch relations (agent, thana)
        });
        return res.status(200).json({
            success: true,
            message: "Delivery Men fetched successfully",
            data: deliveryMen,
        });
    }
    catch (error) {
        console.error("Error fetching delivery men:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching delivery men",
            data: {},
        });
    }
});
exports.getDeliveryMen = getDeliveryMen;
// Get DeliveryMan by ID
const getDeliveryManById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deliveryMan = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
            where: { id: Number(id) },
            relations: ["agent", "thana"],
        });
        if (!deliveryMan) {
            return res.status(404).json({
                success: false,
                message: "Delivery Man not found",
                data: {},
            });
        }
        return res.status(200).json({
            success: true,
            message: "Delivery Man fetched successfully",
            data: deliveryMan,
        });
    }
    catch (error) {
        console.error("Error fetching delivery man by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching delivery man",
            data: {},
        });
    }
});
exports.getDeliveryManById = getDeliveryManById;
// Update DeliveryMan
const updateDeliveryMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, balance, agentId, thanaId } = req.body;
    if (!name || balance === undefined || !agentId || !thanaId) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, balance, agent, thana) are required",
            data: {},
        });
    }
    try {
        const deliveryMan = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
            where: { id: Number(id) },
        });
        if (!deliveryMan) {
            return res.status(404).json({
                success: false,
                message: "Delivery Man not found",
                data: {},
            });
        }
        // Find associated Agent and Thana
        const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
            where: { id: agentId },
        });
        const thana = yield data_source_1.AppDataSource.manager.findOne(Thana_1.Thana, {
            where: { id: thanaId },
        });
        if (!agent || !thana) {
            return res.status(404).json({
                success: false,
                message: "Agent or Thana not found",
                data: {},
            });
        }
        // Update delivery man fields
        deliveryMan.name = name;
        deliveryMan.balance = balance;
        deliveryMan.agent = agent;
        deliveryMan.thana = thana;
        // Save the updated delivery man to the database
        yield data_source_1.AppDataSource.manager.save(deliveryMan);
        return res.status(200).json({
            success: true,
            message: "Delivery Man updated successfully",
            data: deliveryMan,
        });
    }
    catch (error) {
        console.error("Error updating delivery man:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating delivery man",
            data: {},
        });
    }
});
exports.updateDeliveryMan = updateDeliveryMan;
// Delete DeliveryMan
const deleteDeliveryMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deliveryMan = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
            where: { id: Number(id) },
        });
        if (!deliveryMan) {
            return res.status(404).json({
                success: false,
                message: "Delivery Man not found",
                data: {},
            });
        }
        // Delete the delivery man from the database
        yield data_source_1.AppDataSource.manager.remove(deliveryMan);
        return res.status(200).json({
            success: true,
            message: "Delivery Man deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.error("Error deleting delivery man:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting delivery man",
            data: {},
        });
    }
});
exports.deleteDeliveryMan = deleteDeliveryMan;
