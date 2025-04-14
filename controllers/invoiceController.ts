import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Invoice } from "../entities/Invoice";
import { PickupMan } from "../entities/PickupMan";
import { Agent } from "../entities/Agent";
import { DeliveryMan } from "../entities/DeliveryMan";
import { Merchant } from "../entities/Merchant";
import { Delivery } from "../entities/Delivery";

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
    const invoice = await AppDataSource.getRepository(Invoice)
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
        message:
          "Invoice already marked as Paid. Payment has already been processed.",
        data: invoice,
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

    // ✅ Sync payment_status with Delivery if invoice is marked "Paid"
    if (payment_status === "Paid" && invoice.delivery) {
      invoice.delivery.payment_status = "Paid";
      await AppDataSource.manager.save(Delivery, invoice.delivery);
    }

    // ✅ Distribute money if both Invoice and Delivery are marked as "Paid"
    const delivery = invoice.delivery;
    if (payment_status === "Paid" && delivery?.payment_status == "Paid") {
      const price = Number(delivery?.price) || 0;
      const agentCut = price * 0.1;
      const pickupManCut = price * 0.03;
      const deliveryManCut = price * 0.02;

      // Log balances before update
      console.log("Before update:");
      console.log("Agent Balance: ", delivery?.agent?.balance);
      console.log("PickupMan Balance: ", delivery?.pickupMan?.balance);
      console.log("DeliveryMan Balance: ", delivery?.deliveryMan?.balance);
      console.log("Merchant Balance: ", delivery?.merchant?.balance);

      // Transfer to Agent
      if (delivery?.agent?.balance !== undefined) {
        delivery.agent.balance =
          (Number(delivery.agent.balance) || 0) + agentCut;
        await AppDataSource.manager.save(Agent, delivery.agent);
      }

      // Transfer to PickupMan
      if (delivery?.pickupMan?.balance !== undefined) {
        delivery.pickupMan.balance =
          (Number(delivery.pickupMan.balance) || 0) + pickupManCut;
        await AppDataSource.manager.save(PickupMan, delivery.pickupMan);
      }

      // Transfer to DeliveryMan
      if (delivery?.deliveryMan?.balance !== undefined) {
        delivery.deliveryMan.balance =
          (Number(delivery.deliveryMan.balance) || 0) + deliveryManCut;
        await AppDataSource.manager.save(DeliveryMan, delivery.deliveryMan);
      }

      // Remaining to Merchant
      const merchantCut = price - (agentCut + pickupManCut + deliveryManCut);
      if (delivery?.merchant?.balance !== undefined) {
        delivery.merchant.balance =
          (Number(delivery.merchant.balance) || 0) + merchantCut;
        await AppDataSource.manager.save(Merchant, delivery.merchant);
      }

      // Log balances after update
      console.log("After update:");
      console.log("Agent Balance: ", delivery?.agent?.balance);
      console.log("PickupMan Balance: ", delivery?.pickupMan?.balance);
      console.log("DeliveryMan Balance: ", delivery?.deliveryMan?.balance);
      console.log("Merchant Balance: ", delivery?.merchant?.balance);
    }

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
