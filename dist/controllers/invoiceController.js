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
exports.getAllInvoices = exports.deleteInvoice = exports.updateInvoice = void 0;
const data_source_1 = require("../data-source");
const Invoice_1 = require("../entities/Invoice");
const PickupMan_1 = require("../entities/PickupMan");
const Agent_1 = require("../entities/Agent");
const DeliveryMan_1 = require("../entities/DeliveryMan");
const Merchant_1 = require("../entities/Merchant");
// ✅ Update Invoice
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const { delivery_charge, cod_fee, collected_amount, receivable_amount, total_amount, payment_status, } = req.body;
    try {
        // Fetch the invoice with related delivery, agent, pickupMan, deliveryMan, and merchant
        const invoice = yield data_source_1.AppDataSource.manager
            .createQueryBuilder(Invoice_1.Invoice, "invoice")
            .leftJoinAndSelect("invoice.delivery", "delivery")
            .leftJoinAndSelect("delivery.agent", "agent")
            .leftJoinAndSelect("delivery.pickupMan", "pickupMan")
            .leftJoinAndSelect("delivery.deliveryMan", "deliveryMan")
            .leftJoinAndSelect("delivery.merchant", "merchant")
            .where("invoice.id = :id", { id: Number(id) })
            .getOne();
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
                data: {},
            });
        }
        // Update fields if provided
        if (delivery_charge !== undefined)
            invoice.delivery_charge = delivery_charge;
        if (cod_fee !== undefined)
            invoice.cod_fee = cod_fee;
        if (collected_amount !== undefined)
            invoice.collected_amount = collected_amount;
        if (receivable_amount !== undefined)
            invoice.receivable_amount = receivable_amount;
        if (total_amount !== undefined)
            invoice.total_amount = total_amount;
        if (payment_status)
            invoice.payment_status = payment_status;
        const updatedInvoice = yield data_source_1.AppDataSource.manager.save(Invoice_1.Invoice, invoice);
        // ✅ Sync payment_status with Delivery if invoice is marked "Paid"
        if (payment_status === "Paid" && invoice.delivery) {
            invoice.delivery.payment_status = "Paid";
            yield data_source_1.AppDataSource.manager.save(invoice.delivery);
        }
        // ✅ Distribute money if both Invoice and Delivery are marked as "Paid"
        const delivery = invoice.delivery;
        if (payment_status === "Paid" && (delivery === null || delivery === void 0 ? void 0 : delivery.payment_status) === "Paid") {
            const price = Number(delivery.price) || 0;
            const agentCut = price * 0.1;
            const pickupManCut = price * 0.03;
            const deliveryManCut = price * 0.02;
            // Ensure balances are initialized to 0 if undefined
            if (delivery.agent) {
                delivery.agent.balance = (_a = delivery.agent.balance) !== null && _a !== void 0 ? _a : 0;
                delivery.agent.balance += agentCut;
                yield data_source_1.AppDataSource.manager.save(Agent_1.Agent, delivery.agent);
            }
            if (delivery.pickupMan) {
                delivery.pickupMan.balance = (_b = delivery.pickupMan.balance) !== null && _b !== void 0 ? _b : 0;
                delivery.pickupMan.balance += pickupManCut;
                yield data_source_1.AppDataSource.manager.save(PickupMan_1.PickupMan, delivery.pickupMan);
            }
            if (delivery.deliveryMan) {
                delivery.deliveryMan.balance = (_c = delivery.deliveryMan.balance) !== null && _c !== void 0 ? _c : 0;
                delivery.deliveryMan.balance += deliveryManCut;
                yield data_source_1.AppDataSource.manager.save(DeliveryMan_1.DeliveryMan, delivery.deliveryMan);
            }
            // Remaining to Merchant
            const merchantCut = price - (agentCut + pickupManCut + deliveryManCut);
            if (delivery.merchant) {
                delivery.merchant.balance = (_d = delivery.merchant.balance) !== null && _d !== void 0 ? _d : 0;
                delivery.merchant.balance += merchantCut;
                yield data_source_1.AppDataSource.manager.save(Merchant_1.Merchant, delivery.merchant);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            data: updatedInvoice,
        });
    }
    catch (error) {
        console.error("Error updating invoice:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating invoice",
            data: {},
        });
    }
});
exports.updateInvoice = updateInvoice;
// ❌ Delete Invoice
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const invoice = yield data_source_1.AppDataSource.manager.findOne(Invoice_1.Invoice, {
            where: { id: Number(id) },
        });
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
                data: {},
            });
        }
        yield data_source_1.AppDataSource.manager.remove(Invoice_1.Invoice, invoice);
        return res.status(200).json({
            success: true,
            message: "Invoice deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.error("Error deleting invoice:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting invoice",
            data: {},
        });
    }
});
exports.deleteInvoice = deleteInvoice;
// ✅ Get All Invoices
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield data_source_1.AppDataSource.manager.find(Invoice_1.Invoice);
        return res.status(200).json({
            success: true,
            message: "Invoices fetched successfully",
            data: invoices,
        });
    }
    catch (error) {
        console.error("Error fetching invoices:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching invoices",
            data: [],
        });
    }
});
exports.getAllInvoices = getAllInvoices;
