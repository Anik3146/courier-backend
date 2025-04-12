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
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlanById = exports.getAllPlans = void 0;
const data_source_1 = require("../data-source");
const PricingPlan_1 = require("../entities/PricingPlan");
const repo = data_source_1.AppDataSource.getRepository(PricingPlan_1.PricingPlan);
// Get All Plans
const getAllPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plans = yield repo.find();
    res.json({
        success: true,
        message: "Pricing plans fetched successfully.",
        data: plans,
    });
});
exports.getAllPlans = getAllPlans;
// Get Plan by ID
const getPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield repo.findOneBy({ id: Number(req.params.id) });
    if (!plan) {
        return res.status(404).json({
            success: false,
            message: "Pricing plan not found.",
            data: null,
        });
    }
    res.json({
        success: true,
        message: "Pricing plan fetched successfully.",
        data: plan,
    });
});
exports.getPlanById = getPlanById;
// Create Plan
const createPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = repo.create(req.body);
    const result = yield repo.save(plan);
    res.status(201).json({
        success: true,
        message: "Pricing plan created successfully.",
        data: result,
    });
});
exports.createPlan = createPlan;
// Update Plan
const updatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const plan = yield repo.findOneBy({ id });
    if (!plan) {
        return res.status(404).json({
            success: false,
            message: "Pricing plan not found.",
            data: null,
        });
    }
    repo.merge(plan, req.body);
    const result = yield repo.save(plan);
    res.json({
        success: true,
        message: "Pricing plan updated successfully.",
        data: result,
    });
});
exports.updatePlan = updatePlan;
// Delete Plan
const deletePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield repo.delete(req.params.id);
    const deleted = (_a = result.affected) !== null && _a !== void 0 ? _a : 0;
    if (deleted === 0) {
        return res.status(404).json({
            success: false,
            message: "Pricing plan not found or already deleted.",
            data: null,
        });
    }
    res.json({
        success: true,
        message: "Pricing plan deleted successfully.",
        data: { deleted },
    });
});
exports.deletePlan = deletePlan;
