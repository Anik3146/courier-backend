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
exports.deleteDeliveryCharge = exports.updateDeliveryCharge = exports.getDeliveryChargeById = exports.getDeliveryCharges = exports.createDeliveryCharge = void 0;
const data_source_1 = require("../data-source");
const DeliveryCharges_1 = require("../entities/DeliveryCharges");
// Create Delivery Charge
const createDeliveryCharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { area, charge } = req.body;
    if (!area || charge === undefined) {
        return res
            .status(400)
            .json({
            success: false,
            message: "Area and charge are required",
            data: {},
        });
    }
    try {
        const deliveryCharge = new DeliveryCharges_1.DeliveryCharge();
        deliveryCharge.area = area;
        deliveryCharge.charge = charge;
        // Save the new delivery charge to the database
        yield data_source_1.AppDataSource.manager.save(deliveryCharge);
        return res.status(201).json({
            success: true,
            message: "Delivery charge created successfully",
            data: deliveryCharge,
        });
    }
    catch (error) {
        console.error("Error creating delivery charge:", error);
        return res
            .status(500)
            .json({
            success: false,
            message: "Error creating delivery charge",
            data: {},
        });
    }
});
exports.createDeliveryCharge = createDeliveryCharge;
// Get all Delivery Charges
const getDeliveryCharges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryCharges = yield data_source_1.AppDataSource.manager.find(DeliveryCharges_1.DeliveryCharge);
        return res.status(200).json({
            success: true,
            message: "Delivery charges fetched successfully",
            data: deliveryCharges,
        });
    }
    catch (error) {
        console.error("Error fetching delivery charges:", error);
        return res
            .status(500)
            .json({
            success: false,
            message: "Error fetching delivery charges",
            data: [],
        });
    }
});
exports.getDeliveryCharges = getDeliveryCharges;
// Get Delivery Charge by ID
const getDeliveryChargeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deliveryCharge = yield data_source_1.AppDataSource.manager.findOne(DeliveryCharges_1.DeliveryCharge, {
            where: { id: Number(id) },
        });
        if (!deliveryCharge) {
            return res
                .status(404)
                .json({
                success: false,
                message: "Delivery charge not found",
                data: {},
            });
        }
        return res.status(200).json({
            success: true,
            message: "Delivery charge fetched successfully",
            data: deliveryCharge,
        });
    }
    catch (error) {
        console.error("Error fetching delivery charge by ID:", error);
        return res
            .status(500)
            .json({
            success: false,
            message: "Error fetching delivery charge",
            data: {},
        });
    }
});
exports.getDeliveryChargeById = getDeliveryChargeById;
// Update Delivery Charge
const updateDeliveryCharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { area, charge } = req.body;
    if (!area || charge === undefined) {
        return res
            .status(400)
            .json({
            success: false,
            message: "Area and charge are required",
            data: {},
        });
    }
    try {
        const deliveryCharge = yield data_source_1.AppDataSource.manager.findOne(DeliveryCharges_1.DeliveryCharge, {
            where: { id: Number(id) },
        });
        if (!deliveryCharge) {
            return res
                .status(404)
                .json({
                success: false,
                message: "Delivery charge not found",
                data: {},
            });
        }
        deliveryCharge.area = area;
        deliveryCharge.charge = charge;
        // Save the updated delivery charge to the database
        yield data_source_1.AppDataSource.manager.save(deliveryCharge);
        return res.status(200).json({
            success: true,
            message: "Delivery charge updated successfully",
            data: deliveryCharge,
        });
    }
    catch (error) {
        console.error("Error updating delivery charge:", error);
        return res
            .status(500)
            .json({
            success: false,
            message: "Error updating delivery charge",
            data: {},
        });
    }
});
exports.updateDeliveryCharge = updateDeliveryCharge;
// Delete Delivery Charge
const deleteDeliveryCharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deliveryCharge = yield data_source_1.AppDataSource.manager.findOne(DeliveryCharges_1.DeliveryCharge, {
            where: { id: Number(id) },
        });
        if (!deliveryCharge) {
            return res
                .status(404)
                .json({
                success: false,
                message: "Delivery charge not found",
                data: {},
            });
        }
        // Delete the delivery charge from the database
        yield data_source_1.AppDataSource.manager.remove(deliveryCharge);
        return res.status(200).json({
            success: true,
            message: "Delivery charge deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.error("Error deleting delivery charge:", error);
        return res
            .status(500)
            .json({
            success: false,
            message: "Error deleting delivery charge",
            data: {},
        });
    }
});
exports.deleteDeliveryCharge = deleteDeliveryCharge;
