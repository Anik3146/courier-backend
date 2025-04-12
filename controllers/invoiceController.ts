import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Invoice } from "../entities/Invoice";

// ✅ Update Invoice
export const updateInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    delivery_charge,
    cod_fee,
    collected_amount,
    receivable_amount,
    total_amount,
    payment_status,
  } = req.body;

  try {
    const invoice = await AppDataSource.manager.findOne(Invoice, {
      where: { id: Number(id) },
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
    if (cod_fee !== undefined) invoice.cod_fee = cod_fee;
    if (collected_amount !== undefined)
      invoice.collected_amount = collected_amount;
    if (receivable_amount !== undefined)
      invoice.receivable_amount = receivable_amount;
    if (total_amount !== undefined) invoice.total_amount = total_amount;
    if (payment_status) invoice.payment_status = payment_status;

    const updatedInvoice = await AppDataSource.manager.save(Invoice, invoice);

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating invoice",
      data: {},
    });
  }
};

// ❌ Delete Invoice
export const deleteInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const invoice = await AppDataSource.manager.findOne(Invoice, {
      where: { id: Number(id) },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
        data: {},
      });
    }

    await AppDataSource.manager.remove(Invoice, invoice);

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting invoice",
      data: {},
    });
  }
};

// ✅ Get All Invoices
export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await AppDataSource.manager.find(Invoice);

    return res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching invoices",
      data: [],
    });
  }
};
