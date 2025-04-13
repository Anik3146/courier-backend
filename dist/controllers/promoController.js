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
exports.deletePromo = exports.updatePromo = exports.createPromo = exports.getPromoById = exports.getAllPromos = void 0;
const data_source_1 = require("../data-source");
const Promo_1 = require("../entities/Promo");
const promoRepo = data_source_1.AppDataSource.getRepository(Promo_1.Promo);
// Helper function for success response
const successResponse = (message, data) => ({
    success: true,
    message,
    data,
});
// Helper function for error response
const errorResponse = (message) => ({
    success: false,
    message,
});
// Get all promos
const getAllPromos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promos = yield promoRepo.find();
        res.json(successResponse("Promos retrieved successfully", promos));
    }
    catch (error) {
        res.status(500).json(errorResponse("Failed to fetch promos"));
    }
});
exports.getAllPromos = getAllPromos;
// Get promo by ID
const getPromoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promo = yield promoRepo.findOneBy({ id: +req.params.id });
        if (!promo) {
            return res.status(404).json(errorResponse("Promo not found"));
        }
        res.json(successResponse("Promo retrieved successfully", promo));
    }
    catch (error) {
        res.status(500).json(errorResponse("Error retrieving promo"));
    }
});
exports.getPromoById = getPromoById;
// Create promo
const createPromo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promo = promoRepo.create(req.body);
        const saved = yield promoRepo.save(promo);
        res.status(201).json(successResponse("Promo created successfully", saved));
    }
    catch (error) {
        res.status(500).json(errorResponse("Failed to create promo"));
    }
});
exports.createPromo = createPromo;
// Update promo
const updatePromo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promo = yield promoRepo.findOneBy({ id: +req.params.id });
        if (!promo) {
            return res.status(404).json(errorResponse("Promo not found"));
        }
        promoRepo.merge(promo, req.body);
        const updated = yield promoRepo.save(promo);
        res.json(successResponse("Promo updated successfully", updated));
    }
    catch (error) {
        res.status(500).json(errorResponse("Failed to update promo"));
    }
});
exports.updatePromo = updatePromo;
// Delete promo
const deletePromo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield promoRepo.delete(+req.params.id);
        if (result.affected === 0) {
            return res.status(404).json(errorResponse("Promo not found"));
        }
        res.json(successResponse("Promo deleted successfully", {
            message: "Promo deleted",
        }));
    }
    catch (error) {
        res.status(500).json(errorResponse("Failed to delete promo"));
    }
});
exports.deletePromo = deletePromo;
