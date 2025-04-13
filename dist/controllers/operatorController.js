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
exports.deleteOperator = exports.updateOperator = exports.createOperator = exports.getOperatorById = exports.getAllOperators = void 0;
const data_source_1 = require("../data-source");
const Operator_1 = require("../entities/Operator");
const District_1 = require("../entities/District");
const Thana_1 = require("../entities/Thana");
const Agent_1 = require("../entities/Agent");
const typeorm_1 = require("typeorm");
const operatorRepo = data_source_1.AppDataSource.getRepository(Operator_1.Operator);
const getAllOperators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operators = yield operatorRepo.find({
        relations: ["districts", "thanas"],
    });
    res.json({
        success: true,
        message: "Operators fetched successfully",
        data: operators,
    });
});
exports.getAllOperators = getAllOperators;
const getOperatorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operator = yield operatorRepo.findOne({
        where: { id: +req.params.id },
        relations: ["districts", "thanas"],
    });
    if (!operator)
        return res
            .status(404)
            .json({ success: false, message: "Operator not found" });
    res.json({
        success: true,
        message: "Operator fetched successfully",
        data: operator,
    });
});
exports.getOperatorById = getOperatorById;
const createOperator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, districts, thanas, agents } = req.body;
    try {
        const districtEntities = yield data_source_1.AppDataSource.getRepository(District_1.District).findBy({
            id: (0, typeorm_1.In)(districts),
        });
        const thanaEntities = yield data_source_1.AppDataSource.getRepository(Thana_1.Thana).findBy({
            id: (0, typeorm_1.In)(thanas),
        });
        const agentEntities = yield data_source_1.AppDataSource.getRepository(Agent_1.Agent).findBy({
            id: (0, typeorm_1.In)(agents),
        });
        if (districtEntities.length !== districts.length ||
            thanaEntities.length !== thanas.length ||
            agentEntities.length !== agents.length) {
            return res.status(400).json({
                success: false,
                message: "One or more related entities not found",
            });
        }
        const operator = operatorRepo.create({
            name,
            email,
            districts: districtEntities,
            thanas: thanaEntities,
            agents: agentEntities,
        });
        const savedOperator = yield operatorRepo.save(operator);
        return res.status(201).json({
            success: true,
            message: "Operator created successfully",
            data: savedOperator,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.createOperator = createOperator;
const updateOperator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operatorId = +req.params.id;
    const { name, email, districts, thanas, agents } = req.body;
    try {
        const operator = yield operatorRepo.findOne({
            where: { id: operatorId },
            relations: ["districts", "thanas", "agents"],
        });
        if (!operator) {
            return res
                .status(404)
                .json({ success: false, message: "Operator not found" });
        }
        const districtEntities = yield data_source_1.AppDataSource.getRepository(District_1.District).findBy({
            id: (0, typeorm_1.In)(districts),
        });
        const thanaEntities = yield data_source_1.AppDataSource.getRepository(Thana_1.Thana).findBy({
            id: (0, typeorm_1.In)(thanas),
        });
        const agentEntities = yield data_source_1.AppDataSource.getRepository(Agent_1.Agent).findBy({
            id: (0, typeorm_1.In)(agents),
        });
        if (districtEntities.length !== districts.length ||
            thanaEntities.length !== thanas.length ||
            agentEntities.length !== agents.length) {
            return res.status(400).json({
                success: false,
                message: "One or more related entities not found",
            });
        }
        operator.name = name;
        operator.email = email;
        operator.districts = districtEntities;
        operator.thanas = thanaEntities;
        operator.agents = agentEntities;
        const updatedOperator = yield operatorRepo.save(operator);
        return res.json({
            success: true,
            message: "Operator updated successfully",
            data: updatedOperator,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.updateOperator = updateOperator;
const deleteOperator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operatorId = +req.params.id;
    try {
        const operator = yield operatorRepo.findOne({
            where: { id: operatorId },
            relations: ["districts", "thanas", "agents"],
        });
        if (!operator) {
            return res
                .status(404)
                .json({ success: false, message: "Operator not found" });
        }
        // Optional: Clear relations before delete
        operator.districts = [];
        operator.thanas = [];
        operator.agents = [];
        yield operatorRepo.save(operator);
        yield operatorRepo.remove(operator);
        return res.json({
            success: true,
            message: "Operator deleted successfully",
            data: null,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.deleteOperator = deleteOperator;
