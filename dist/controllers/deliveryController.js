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
exports.getDeliveryStageBreakdown = exports.getReverseDeliveries = exports.getReturnedDeliveries = exports.getActiveDeliveries = exports.getAllDeliveries = exports.updateDeliveryStatus = exports.createDelivery = void 0;
const data_source_1 = require("../data-source"); // DB connection
const Merchant_1 = require("../entities/Merchant");
const Delivery_1 = require("../entities/Delivery");
const Agent_1 = require("../entities/Agent");
const PickupMan_1 = require("../entities/PickupMan");
const DeliveryMan_1 = require("../entities/DeliveryMan");
const typeorm_1 = require("typeorm");
const Invoice_1 = require("../entities/Invoice");
// Create a new delivery
const createDelivery = (req, res) => {
    const createNewDelivery = () => __awaiter(void 0, void 0, void 0, function* () {
        const { store_name, product_type, merchant_id, recipient_name, recipient_phone, recipient_secondary_phone, address, area, instructions, delivery_type, total_weight, quantity, amount_to_collect, price, division, zilla, thana, delivery_charge, payment_status, // optional in body, default below
         } = req.body;
        if (!store_name || !product_type || !recipient_name || !recipient_phone) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                data: {},
            });
        }
        try {
            const merchant = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { id: merchant_id },
            });
            if (!merchant) {
                return res.status(404).json({
                    success: false,
                    message: "Merchant not found",
                    data: {},
                });
            }
            const delivery = new Delivery_1.Delivery();
            delivery.store_name = store_name;
            delivery.product_type = product_type;
            delivery.merchant = merchant;
            delivery.recipient_name = recipient_name;
            delivery.recipient_phone = recipient_phone;
            delivery.recipient_secondary_phone = recipient_secondary_phone;
            delivery.address = address;
            delivery.area = area;
            delivery.instructions = instructions;
            delivery.delivery_type = delivery_type;
            delivery.total_weight = total_weight;
            delivery.quantity = quantity;
            delivery.amount_to_collect = amount_to_collect;
            delivery.price = price;
            delivery.division = division;
            delivery.zilla = zilla;
            delivery.thana = thana;
            delivery.delivery_charge = delivery_charge;
            delivery.delivery_status = "Pending";
            delivery.pickup_status = "Pending";
            delivery.payment_status = payment_status || "Unpaid"; // default
            // Save delivery
            const savedDelivery = yield data_source_1.AppDataSource.manager.save(delivery);
            // Create corresponding invoice
            const codFee = +(Number(savedDelivery.amount_to_collect) * 0.02).toFixed(2);
            const collectedAmount = Number(savedDelivery.amount_to_collect);
            const receivableAmount = +(collectedAmount -
                Number(delivery_charge) -
                codFee).toFixed(2);
            const invoice = new Invoice_1.Invoice();
            invoice.delivery = savedDelivery;
            invoice.total_amount = Number(price);
            invoice.delivery_charge = Number(delivery_charge);
            invoice.cod_fee = codFee;
            invoice.collected_amount = collectedAmount;
            invoice.receivable_amount = receivableAmount;
            invoice.payment_status = "Processing";
            yield data_source_1.AppDataSource.manager.save(invoice);
            return res.status(201).json({
                success: true,
                message: "Delivery and invoice created successfully",
                data: {
                    delivery: savedDelivery,
                    invoice,
                },
            });
        }
        catch (error) {
            console.error("Error saving delivery:", error);
            return res.status(500).json({
                success: false,
                message: "Error saving delivery",
                data: {},
            });
        }
    });
    createNewDelivery().catch((err) => {
        console.error("Unexpected error:", err);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
            data: {},
        });
    });
};
exports.createDelivery = createDelivery;
// Update Delivery Status (Pickup & Delivery)
const updateDeliveryStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { store_name, product_type, recipient_name, recipient_phone, recipient_secondary_phone, address, area, instructions, delivery_type, total_weight, quantity, amount_to_collect, price, division, zilla, thana, delivery_status, pickup_status, payment_status, delivery_charge, agentId, pickupManId, deliveryManId, } = req.body;
    try {
        const delivery = yield data_source_1.AppDataSource.manager.findOne(Delivery_1.Delivery, {
            where: { id: Number(id) },
            relations: ["agent", "pickupMan", "deliveryMan", "merchant", "invoice"],
        });
        if (!delivery) {
            return res.status(404).json({
                success: false,
                message: "Delivery not found",
                data: {},
            });
        }
        // ✅ Update general delivery fields
        if (store_name !== undefined)
            delivery.store_name = store_name;
        if (product_type !== undefined)
            delivery.product_type = product_type;
        if (recipient_name !== undefined)
            delivery.recipient_name = recipient_name;
        if (recipient_phone !== undefined)
            delivery.recipient_phone = recipient_phone;
        if (recipient_secondary_phone !== undefined)
            delivery.recipient_secondary_phone = recipient_secondary_phone;
        if (address !== undefined)
            delivery.address = address;
        if (area !== undefined)
            delivery.area = area;
        if (instructions !== undefined)
            delivery.instructions = instructions;
        if (delivery_type !== undefined)
            delivery.delivery_type = delivery_type;
        if (total_weight !== undefined)
            delivery.total_weight = total_weight;
        if (quantity !== undefined)
            delivery.quantity = quantity;
        if (amount_to_collect !== undefined)
            delivery.amount_to_collect = amount_to_collect;
        if (price !== undefined)
            delivery.price = price;
        if (division !== undefined)
            delivery.division = division;
        if (zilla !== undefined)
            delivery.zilla = zilla;
        if (thana !== undefined)
            delivery.thana = thana;
        if (delivery_charge !== undefined)
            delivery.delivery_charge = delivery_charge;
        if (pickup_status !== undefined)
            delivery.pickup_status = pickup_status;
        if (delivery_status !== undefined)
            delivery.delivery_status = delivery_status;
        if (payment_status !== undefined)
            delivery.payment_status = payment_status;
        // ✅ Assign related personnel
        if (agentId !== undefined) {
            const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
                where: { id: agentId },
            });
            if (!agent)
                return res
                    .status(404)
                    .json({ success: false, message: "Agent not found", data: {} });
            delivery.agent = agent;
        }
        if (pickupManId !== undefined) {
            const pickupMan = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
                where: { id: pickupManId },
            });
            if (!pickupMan)
                return res
                    .status(404)
                    .json({ success: false, message: "Pickup Man not found", data: {} });
            delivery.pickupMan = pickupMan;
        }
        if (deliveryManId !== undefined) {
            const deliveryMan = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
                where: { id: deliveryManId },
            });
            if (!deliveryMan)
                return res.status(404).json({
                    success: false,
                    message: "Delivery Man not found",
                    data: {},
                });
            delivery.deliveryMan = deliveryMan;
        }
        // ✅ Save delivery before invoice update
        yield data_source_1.AppDataSource.manager.save(Delivery_1.Delivery, delivery);
        // ✅ Update invoice linked to this delivery
        const invoice = yield data_source_1.AppDataSource.manager.findOne(Invoice_1.Invoice, {
            where: { delivery: { id: delivery.id } },
            relations: ["delivery"],
        });
        if (invoice) {
            const updatedCOD = Number(delivery.amount_to_collect || 0);
            const updatedCharge = Number(delivery.delivery_charge || 0);
            const updatedPrice = Number(delivery.price || 0);
            const codFee = +(updatedCOD * 0.02).toFixed(2);
            const receivableAmount = +(updatedCOD - updatedCharge - codFee).toFixed(2);
            invoice.total_amount = updatedPrice;
            invoice.delivery_charge = updatedCharge;
            invoice.cod_fee = codFee;
            invoice.collected_amount = updatedCOD;
            invoice.receivable_amount = receivableAmount;
            // Sync status if delivery is marked paid
            if (delivery.payment_status === "Paid") {
                invoice.payment_status = "Paid";
            }
            yield data_source_1.AppDataSource.manager.save(invoice);
        }
        // ✅ Money distribution: only when both are marked "Paid"
        if (invoice &&
            invoice.payment_status === "Paid" &&
            delivery.payment_status === "Paid" &&
            delivery.agent &&
            delivery.pickupMan &&
            delivery.deliveryMan &&
            delivery.merchant) {
            const priceVal = Number(delivery.price || 0);
            const agentCut = priceVal * 0.1;
            const pickupManCut = priceVal * 0.03;
            const deliveryManCut = priceVal * 0.02;
            // Distribute
            if (delivery.agent.balance !== undefined) {
                delivery.agent.balance = Number(delivery.agent.balance) + agentCut;
                yield data_source_1.AppDataSource.manager.save(Agent_1.Agent, delivery.agent);
            }
            if (delivery.pickupMan.balance !== undefined) {
                delivery.pickupMan.balance =
                    Number(delivery.pickupMan.balance) + pickupManCut;
                yield data_source_1.AppDataSource.manager.save(PickupMan_1.PickupMan, delivery.pickupMan);
            }
            if (delivery.deliveryMan.balance !== undefined) {
                delivery.deliveryMan.balance =
                    Number(delivery.deliveryMan.balance) + deliveryManCut;
                yield data_source_1.AppDataSource.manager.save(DeliveryMan_1.DeliveryMan, delivery.deliveryMan);
            }
            const remainingAmount = priceVal - (agentCut + pickupManCut + deliveryManCut);
            if (delivery.merchant.balance !== undefined) {
                delivery.merchant.balance =
                    Number(delivery.merchant.balance) + remainingAmount;
                yield data_source_1.AppDataSource.manager.save(Merchant_1.Merchant, delivery.merchant);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Delivery updated successfully",
            data: delivery,
        });
    }
    catch (error) {
        console.error("Error updating delivery:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating delivery",
            data: {},
        });
    }
});
exports.updateDeliveryStatus = updateDeliveryStatus;
// 1. Get All Deliveries
const getAllDeliveries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield data_source_1.AppDataSource.manager.find(Delivery_1.Delivery);
        return res.json({ success: true, data: deliveries });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getAllDeliveries = getAllDeliveries;
// 2. Get Active Deliveries
const getActiveDeliveries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activeStatuses = [
            "At Sorting",
            "In Transit",
            "At Delivery Hub",
            "Assigned to Delivery",
            "On Hold",
        ];
        const deliveries = yield data_source_1.AppDataSource.manager.find(Delivery_1.Delivery, {
            where: {
                delivery_status: (0, typeorm_1.In)(activeStatuses),
            },
        });
        return res.json({ success: true, data: deliveries });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getActiveDeliveries = getActiveDeliveries;
// 3. Get Returned Deliveries
const getReturnedDeliveries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield data_source_1.AppDataSource.manager.find(Delivery_1.Delivery, {
            where: { delivery_status: "Returned" },
        });
        return res.json({ success: true, data: deliveries });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getReturnedDeliveries = getReturnedDeliveries;
// 4. Get Reverse Deliveries
const getReverseDeliveries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield data_source_1.AppDataSource.manager.find(Delivery_1.Delivery, {
            where: { delivery_status: "Reverse Delivery" },
        });
        return res.json({ success: true, data: deliveries });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getReverseDeliveries = getReverseDeliveries;
// ✅ Percentage of Deliveries by Stage (based on total deliveries)
const getDeliveryStageBreakdown = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stages = [
            "At Sorting",
            "In Transit",
            "At Delivery Hub",
            "Assigned to Delivery",
            "Returned",
        ];
        // Get the total number of deliveries
        const totalDeliveries = yield data_source_1.AppDataSource.manager.count(Delivery_1.Delivery);
        if (totalDeliveries === 0) {
            return res.status(200).json({
                success: true,
                message: "No deliveries found",
                data: {},
            });
        }
        const breakdown = {};
        for (const stage of stages) {
            const count = yield data_source_1.AppDataSource.manager.count(Delivery_1.Delivery, {
                where: { delivery_status: stage },
            });
            breakdown[stage] = ((count / totalDeliveries) * 100).toFixed(2) + "%";
        }
        return res.status(200).json({
            success: true,
            message: "Delivery percentage by stage (based on total deliveries)",
            data: breakdown,
        });
    }
    catch (err) {
        console.error("Error calculating delivery breakdown:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});
exports.getDeliveryStageBreakdown = getDeliveryStageBreakdown;
