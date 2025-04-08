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
            message: "All fields (name, balance, agent, thana) are required",
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
            return res.status(404).json({ message: "Agent or Thana not found" });
        }
        const deliveryMan = new DeliveryMan_1.DeliveryMan();
        deliveryMan.name = name;
        deliveryMan.balance = balance;
        deliveryMan.agent = agent;
        deliveryMan.thana = thana;
        // Save the new delivery man to the database
        yield data_source_1.AppDataSource.manager.save(deliveryMan);
        return res
            .status(201)
            .json({ message: "Delivery Man created successfully", deliveryMan });
    }
    catch (error) {
        console.error("Error creating delivery man:", error);
        return res.status(500).json({ message: "Error creating delivery man" });
    }
});
exports.createDeliveryMan = createDeliveryMan;
// Get all DeliveryMen
const getDeliveryMen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryMen = yield data_source_1.AppDataSource.manager.find(DeliveryMan_1.DeliveryMan, {
            relations: ["agent", "thana"], // Fetch relations (agent, thana)
        });
        return res.status(200).json(deliveryMen);
    }
    catch (error) {
        console.error("Error fetching delivery men:", error);
        return res.status(500).json({ message: "Error fetching delivery men" });
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
            return res.status(404).json({ message: "Delivery Man not found" });
        }
        return res.status(200).json(deliveryMan);
    }
    catch (error) {
        console.error("Error fetching delivery man by ID:", error);
        return res.status(500).json({ message: "Error fetching delivery man" });
    }
});
exports.getDeliveryManById = getDeliveryManById;
// Update DeliveryMan
const updateDeliveryMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, balance, agentId, thanaId } = req.body;
    if (!name || balance === undefined || !agentId || !thanaId) {
        return res.status(400).json({
            message: "All fields (name, balance, agent, thana) are required",
        });
    }
    try {
        const deliveryMan = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
            where: { id: Number(id) },
        });
        if (!deliveryMan) {
            return res.status(404).json({ message: "Delivery Man not found" });
        }
        // Find associated Agent and Thana
        const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
            where: { id: agentId },
        });
        const thana = yield data_source_1.AppDataSource.manager.findOne(Thana_1.Thana, {
            where: { id: thanaId },
        });
        if (!agent || !thana) {
            return res.status(404).json({ message: "Agent or Thana not found" });
        }
        // Update delivery man fields
        deliveryMan.name = name;
        deliveryMan.balance = balance;
        deliveryMan.agent = agent;
        deliveryMan.thana = thana;
        // Save the updated delivery man to the database
        yield data_source_1.AppDataSource.manager.save(deliveryMan);
        return res
            .status(200)
            .json({ message: "Delivery Man updated successfully", deliveryMan });
    }
    catch (error) {
        console.error("Error updating delivery man:", error);
        return res.status(500).json({ message: "Error updating delivery man" });
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
            return res.status(404).json({ message: "Delivery Man not found" });
        }
        // Delete the delivery man from the database
        yield data_source_1.AppDataSource.manager.remove(deliveryMan);
        return res
            .status(200)
            .json({ message: "Delivery Man deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting delivery man:", error);
        return res.status(500).json({ message: "Error deleting delivery man" });
    }
});
exports.deleteDeliveryMan = deleteDeliveryMan;
