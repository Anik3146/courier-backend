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
// ✅ Update Invoice
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { delivery_charge, cod_fee, collected_amount, receivable_amount, total_amount, payment_status, } = req.body;
    try {
        const invoice = yield data_source_1.AppDataSource.manager.findOne(Invoice_1.Invoice, {
            where: { id: Number(id) },
            relations: ["delivery"], // Needed to access the related delivery
        });
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
