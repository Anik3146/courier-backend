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
exports.deleteThana = exports.updateThana = exports.getThanaById = exports.getThanas = exports.createThana = void 0;
const data_source_1 = require("../data-source");
const Thana_1 = require("../entities/Thana");
// Create Thana
const createThana = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thana_name } = req.body;
    if (!thana_name) {
        return res.status(400).json({ message: "Thana name is required" });
    }
    try {
        const thana = new Thana_1.Thana();
        thana.thana_name = thana_name;
        yield data_source_1.AppDataSource.manager.save(thana);
        return res
            .status(201)
            .json({ message: "Thana created successfully", thana });
    }
    catch (error) {
        console.error("Error creating thana:", error);
        return res.status(500).json({ message: "Error creating thana" });
    }
});
exports.createThana = createThana;
// Get all Thanas
const getThanas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thanas = yield data_source_1.AppDataSource.manager.find(Thana_1.Thana, {
            relations: ["agents"], // Optional: To load associated agents if needed
        });
        return res.status(200).json(thanas);
    }
    catch (error) {
        console.error("Error fetching thanas:", error);
        return res.status(500).json({ message: "Error fetching thanas" });
    }
});
exports.getThanas = getThanas;
// Get Thana by ID
const getThanaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const thana = yield data_source_1.AppDataSource.manager.findOne(Thana_1.Thana, {
            where: { id: Number(id) },
            relations: ["agents"], // Optional: To load associated agents if needed
        });
        if (!thana) {
            return res.status(404).json({ message: "Thana not found" });
        }
        return res.status(200).json(thana);
    }
    catch (error) {
        console.error("Error fetching thana by ID:", error);
        return res.status(500).json({ message: "Error fetching thana" });
    }
});
exports.getThanaById = getThanaById;
// Update Thana
const updateThana = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { thana_name } = req.body;
    if (!thana_name) {
        return res.status(400).json({ message: "Thana name is required" });
    }
    try {
        const thana = yield data_source_1.AppDataSource.manager.findOne(Thana_1.Thana, {
            where: { id: Number(id) },
        });
        if (!thana) {
            return res.status(404).json({ message: "Thana not found" });
        }
        thana.thana_name = thana_name;
        yield data_source_1.AppDataSource.manager.save(thana);
        return res
            .status(200)
            .json({ message: "Thana updated successfully", thana });
    }
    catch (error) {
        console.error("Error updating thana:", error);
        return res.status(500).json({ message: "Error updating thana" });
    }
});
exports.updateThana = updateThana;
// Delete Thana
const deleteThana = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const thana = yield data_source_1.AppDataSource.manager.findOne(Thana_1.Thana, {
            where: { id: Number(id) },
        });
        if (!thana) {
            return res.status(404).json({ message: "Thana not found" });
        }
        yield data_source_1.AppDataSource.manager.remove(thana);
        return res.status(200).json({ message: "Thana deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting thana:", error);
        return res.status(500).json({ message: "Error deleting thana" });
    }
});
exports.deleteThana = deleteThana;
