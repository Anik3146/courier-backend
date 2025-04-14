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
const Delivery_1 = require("../entities/Delivery");
// ✅ Update Invoice
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const { id } = req.params;
    const { delivery_charge, cod_fee, collected_amount, receivable_amount, total_amount, payment_status, } = req.body;
    try {
        const invoice = yield data_source_1.AppDataSource.getRepository(Invoice_1.Invoice)
            .createQueryBuilder("invoice")
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
        // 🚫 Stop here if invoice is already paid
        if (invoice.payment_status === "Paid") {
            return res.status(400).json({
                success: false,
                message: "Invoice already marked as Paid. Payment has already been processed.",
                data: invoice,
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
            yield data_source_1.AppDataSource.manager.save(Delivery_1.Delivery, invoice.delivery);
        }
        // ✅ Distribute money if both Invoice and Delivery are marked as "Paid"
        const delivery = invoice.delivery;
        if (payment_status === "Paid" && (delivery === null || delivery === void 0 ? void 0 : delivery.payment_status) == "Paid") {
            const price = Number(delivery === null || delivery === void 0 ? void 0 : delivery.price) || 0;
            const agentCut = price * 0.1;
            const pickupManCut = price * 0.03;
            const deliveryManCut = price * 0.02;
            // Log balances before update
            console.log("Before update:");
            console.log("Agent Balance: ", (_a = delivery === null || delivery === void 0 ? void 0 : delivery.agent) === null || _a === void 0 ? void 0 : _a.balance);
            console.log("PickupMan Balance: ", (_b = delivery === null || delivery === void 0 ? void 0 : delivery.pickupMan) === null || _b === void 0 ? void 0 : _b.balance);
            console.log("DeliveryMan Balance: ", (_c = delivery === null || delivery === void 0 ? void 0 : delivery.deliveryMan) === null || _c === void 0 ? void 0 : _c.balance);
            console.log("Merchant Balance: ", (_d = delivery === null || delivery === void 0 ? void 0 : delivery.merchant) === null || _d === void 0 ? void 0 : _d.balance);
            // Transfer to Agent
            if (((_e = delivery === null || delivery === void 0 ? void 0 : delivery.agent) === null || _e === void 0 ? void 0 : _e.balance) !== undefined) {
                delivery.agent.balance =
                    (Number(delivery.agent.balance) || 0) + agentCut;
                yield data_source_1.AppDataSource.manager.save(Agent_1.Agent, delivery.agent);
            }
            // Transfer to PickupMan
            if (((_f = delivery === null || delivery === void 0 ? void 0 : delivery.pickupMan) === null || _f === void 0 ? void 0 : _f.balance) !== undefined) {
                delivery.pickupMan.balance =
                    (Number(delivery.pickupMan.balance) || 0) + pickupManCut;
                yield data_source_1.AppDataSource.manager.save(PickupMan_1.PickupMan, delivery.pickupMan);
            }
            // Transfer to DeliveryMan
            if (((_g = delivery === null || delivery === void 0 ? void 0 : delivery.deliveryMan) === null || _g === void 0 ? void 0 : _g.balance) !== undefined) {
                delivery.deliveryMan.balance =
                    (Number(delivery.deliveryMan.balance) || 0) + deliveryManCut;
                yield data_source_1.AppDataSource.manager.save(DeliveryMan_1.DeliveryMan, delivery.deliveryMan);
            }
            // Remaining to Merchant
            const merchantCut = price - (agentCut + pickupManCut + deliveryManCut);
            if (((_h = delivery === null || delivery === void 0 ? void 0 : delivery.merchant) === null || _h === void 0 ? void 0 : _h.balance) !== undefined) {
                delivery.merchant.balance =
                    (Number(delivery.merchant.balance) || 0) + merchantCut;
                yield data_source_1.AppDataSource.manager.save(Merchant_1.Merchant, delivery.merchant);
            }
            // Log balances after update
            console.log("After update:");
            console.log("Agent Balance: ", (_j = delivery === null || delivery === void 0 ? void 0 : delivery.agent) === null || _j === void 0 ? void 0 : _j.balance);
            console.log("PickupMan Balance: ", (_k = delivery === null || delivery === void 0 ? void 0 : delivery.pickupMan) === null || _k === void 0 ? void 0 : _k.balance);
            console.log("DeliveryMan Balance: ", (_l = delivery === null || delivery === void 0 ? void 0 : delivery.deliveryMan) === null || _l === void 0 ? void 0 : _l.balance);
            console.log("Merchant Balance: ", (_m = delivery === null || delivery === void 0 ? void 0 : delivery.merchant) === null || _m === void 0 ? void 0 : _m.balance);
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
