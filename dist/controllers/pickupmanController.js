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
exports.deletePickupMan = exports.updatePickupMan = exports.getPickupManById = exports.getPickupMen = exports.createPickupMan = void 0;
const data_source_1 = require("../data-source");
const PickupMan_1 = require("../entities/PickupMan");
const Agent_1 = require("../entities/Agent");
const Thana_1 = require("../entities/Thana");
// Create PickupMan
const createPickupMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, balance, agentId, thanaId } = req.body;
    if (!name || balance === undefined || !agentId || !thanaId) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, balance, agent, thana) are required",
            data: {},
        });
    }
    try {
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
        const pickupMan = new PickupMan_1.PickupMan();
        pickupMan.name = name;
        pickupMan.balance = balance;
        pickupMan.agent = agent;
        pickupMan.thana = thana;
        yield data_source_1.AppDataSource.manager.save(pickupMan);
        return res.status(201).json({
            success: true,
            message: "Pickup Man created successfully",
            data: pickupMan,
        });
    }
    catch (error) {
        console.error("Error creating pickup man:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating pickup man",
            data: {},
        });
    }
});
exports.createPickupMan = createPickupMan;
// Get all Pickup Men
const getPickupMen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pickupMen = yield data_source_1.AppDataSource.manager.find(PickupMan_1.PickupMan, {
            relations: ["agent", "thana"],
        });
        return res.status(200).json({
            success: true,
            message: "Pickup Men fetched successfully",
            data: pickupMen,
        });
    }
    catch (error) {
        console.error("Error fetching pickup men:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching pickup men",
            data: {},
        });
    }
});
exports.getPickupMen = getPickupMen;
// Get Pickup Man by ID
const getPickupManById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pickupMan = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
            where: { id: Number(id) },
            relations: ["agent", "thana"],
        });
        if (!pickupMan) {
            return res.status(404).json({
                success: false,
                message: "Pickup Man not found",
                data: {},
            });
        }
        return res.status(200).json({
            success: true,
            message: "Pickup Man fetched successfully",
            data: pickupMan,
        });
    }
    catch (error) {
        console.error("Error fetching pickup man by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching pickup man",
            data: {},
        });
    }
});
exports.getPickupManById = getPickupManById;
// Update Pickup Man
const updatePickupMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const pickupMan = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
            where: { id: Number(id) },
        });
        if (!pickupMan) {
            return res.status(404).json({
                success: false,
                message: "Pickup Man not found",
                data: {},
            });
        }
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
        pickupMan.name = name;
        pickupMan.balance = balance;
        pickupMan.agent = agent;
        pickupMan.thana = thana;
        yield data_source_1.AppDataSource.manager.save(pickupMan);
        return res.status(200).json({
            success: true,
            message: "Pickup Man updated successfully",
            data: pickupMan,
        });
    }
    catch (error) {
        console.error("Error updating pickup man:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating pickup man",
            data: {},
        });
    }
});
exports.updatePickupMan = updatePickupMan;
// Delete Pickup Man
const deletePickupMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pickupMan = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
            where: { id: Number(id) },
        });
        if (!pickupMan) {
            return res.status(404).json({
                success: false,
                message: "Pickup Man not found",
                data: {},
            });
        }
        yield data_source_1.AppDataSource.manager.remove(pickupMan);
        return res.status(200).json({
            success: true,
            message: "Pickup Man deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.error("Error deleting pickup man:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting pickup man",
            data: {},
        });
    }
});
exports.deletePickupMan = deletePickupMan;
