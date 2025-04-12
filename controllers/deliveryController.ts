// src/controllers/deliveryController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; // DB connection
import { Merchant } from "../entities/Merchant";
import { Delivery } from "../entities/Delivery";
import { Agent } from "../entities/Agent";
import { PickupMan } from "../entities/PickupMan";
import { DeliveryMan } from "../entities/DeliveryMan";
import { Thana } from "../entities/Thana";
import { DeliveryCharge } from "../entities/DeliveryCharges";
import { In } from "typeorm";
import { Invoice } from "../entities/Invoice";

// Create a new delivery
export const createDelivery = (req: Request, res: Response) => {
  const createNewDelivery = async () => {
    const {
      store_name,
      product_type,
      merchant_id,
      recipient_name,
      recipient_phone,
      recipient_secondary_phone,
      address,
      area,
      instructions,
      delivery_type,
      total_weight,
      quantity,
      amount_to_collect,
      price,
      division,
      zilla,
      thana,
      delivery_charge,
      payment_status, // optional in body, default below
    } = req.body;

    if (!store_name || !product_type || !recipient_name || !recipient_phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        data: {},
      });
    }

    try {
      const merchant = await AppDataSource.manager.findOne(Merchant, {
        where: { id: merchant_id },
      });

      if (!merchant) {
        return res.status(404).json({
          success: false,
          message: "Merchant not found",
          data: {},
        });
      }

      const delivery = new Delivery();
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
      const savedDelivery = await AppDataSource.manager.save(delivery);

      // Create corresponding invoice
      const codFee = Number(savedDelivery.amount_to_collect || 0) * 0.02; // 2% COD fee
      const collectedAmount = Number(savedDelivery.amount_to_collect || 0);
      const receivableAmount =
        collectedAmount - (Number(delivery_charge) + codFee);

      const invoice = new Invoice();
      invoice.delivery = savedDelivery;
      invoice.total_amount = Number(price);
      invoice.delivery_charge = Number(delivery_charge);
      invoice.cod_fee = codFee;
      invoice.collected_amount = collectedAmount;
      invoice.receivable_amount = receivableAmount;
      invoice.payment_status = "Processing";

      await AppDataSource.manager.save(invoice);

      return res.status(201).json({
        success: true,
        message: "Delivery and invoice created successfully",
        data: {
          delivery: savedDelivery,
          invoice,
        },
      });
    } catch (error) {
      console.error("Error saving delivery:", error);
      return res.status(500).json({
        success: false,
        message: "Error saving delivery",
        data: {},
      });
    }
  };

  createNewDelivery().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      data: {},
    });
  });
};

// Update Delivery Status (Pickup & Delivery)
export const updateDeliveryStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const {
    delivery_status,
    pickup_status,
    agentId,
    pickupManId,
    deliveryManId,
  } = req.body;

  // // Validate the required fields
  // if (!delivery_status && !pickup_status) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Delivery status or pickup status is required",
  //     data: {},
  //   });
  // }

  try {
    // Find the delivery by ID, along with the necessary relations
    const delivery = await AppDataSource.manager.findOne(Delivery, {
      where: { id: Number(id) },
      relations: ["agent", "pickupMan", "deliveryMan", "merchant"],
    });

    if (!delivery) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery not found", data: {} });
    }

    // Assign the agent if agentId is provided
    if (agentId) {
      const agent = await AppDataSource.manager.findOne(Agent, {
        where: { id: agentId },
      });
      if (agent) {
        delivery.agent = agent;
      } else {
        return res.status(404).json({
          success: false,
          message: "Agent not found",
          data: {},
        });
      }
    }

    // Assign the pickupMan if pickupManId is provided
    if (pickupManId) {
      const pickupMan = await AppDataSource.manager.findOne(PickupMan, {
        where: { id: pickupManId },
      });
      if (pickupMan) {
        delivery.pickupMan = pickupMan;
      } else {
        return res.status(404).json({
          success: false,
          message: "Pickup Man not found",
          data: {},
        });
      }
    }

    // Update the pickup_status if provided
    if (pickup_status) {
      delivery.pickup_status = pickup_status;
    }

    // Assign the deliveryMan if deliveryManId is provided
    if (deliveryManId) {
      const deliveryMan = await AppDataSource.manager.findOne(DeliveryMan, {
        where: { id: deliveryManId },
      });
      if (deliveryMan) {
        delivery.deliveryMan = deliveryMan;
      } else {
        return res.status(404).json({
          success: false,
          message: "Delivery Man not found",
          data: {},
        });
      }
    }

    // Update the delivery_status if provided
    if (delivery_status) {
      delivery.delivery_status = delivery_status;
    }

    // Check if both statuses are completed (Pick Up and Delivered) before distributing the money
    const isCompleted =
      delivery.delivery_status === "Delivered" &&
      delivery.pickup_status === "Picked Up";

    // If both statuses are completed, distribute the money
    if (
      isCompleted &&
      delivery.agent &&
      delivery.pickupMan &&
      delivery.deliveryMan
    ) {
      const price = delivery.price || 0;

      // Split the price calculation into numeric operations (not string concatenation)
      const agentCut = price * 0.1; // 10% cut for agent
      const pickupManCut = price * 0.03; // 3% cut for pickup man
      const deliveryManCut = price * 0.02; // 2% cut for delivery man

      // Update agent balance
      if (delivery.agent.balance !== undefined) {
        delivery.agent.balance += agentCut;
        await AppDataSource.manager.save(Agent, delivery.agent);
      }

      // Update pickup man balance
      if (delivery.pickupMan.balance !== undefined) {
        delivery.pickupMan.balance += pickupManCut;
        await AppDataSource.manager.save(PickupMan, delivery.pickupMan);
      }

      // Update delivery man balance
      if (delivery.deliveryMan.balance !== undefined) {
        delivery.deliveryMan.balance += deliveryManCut;
        await AppDataSource.manager.save(DeliveryMan, delivery.deliveryMan);
      }

      // Calculate remaining amount for the merchant
      const remainingAmount =
        price - (agentCut + pickupManCut + deliveryManCut);

      // Update merchant balance
      if (delivery.merchant?.balance !== undefined) {
        delivery.merchant.balance += remainingAmount;
        await AppDataSource.manager.save(Merchant, delivery.merchant);
      }
    }

    // Save the updated delivery status
    await AppDataSource.manager.save(Delivery, delivery);

    return res.status(200).json({
      success: true,
      message: "Delivery status updated successfully",
      data: delivery,
    });
  } catch (error) {
    console.error("Error updating delivery status:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating delivery status",
      data: {},
    });
  }
};

// 1. Get All Deliveries
export const getAllDeliveries = async (_req: Request, res: Response) => {
  try {
    const deliveries = await AppDataSource.manager.find(Delivery);
    return res.json({ success: true, data: deliveries });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 2. Get Active Deliveries
export const getActiveDeliveries = async (_req: Request, res: Response) => {
  try {
    const activeStatuses = [
      "At Sorting",
      "In Transit",
      "At Delivery Hub",
      "Assigned to Delivery",
      "On Hold",
    ];
    const deliveries = await AppDataSource.manager.find(Delivery, {
      where: {
        delivery_status: In(activeStatuses),
      },
    });
    return res.json({ success: true, data: deliveries });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 3. Get Returned Deliveries
export const getReturnedDeliveries = async (_req: Request, res: Response) => {
  try {
    const deliveries = await AppDataSource.manager.find(Delivery, {
      where: { delivery_status: "Returned" },
    });
    return res.json({ success: true, data: deliveries });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 4. Get Reverse Deliveries
export const getReverseDeliveries = async (_req: Request, res: Response) => {
  try {
    const deliveries = await AppDataSource.manager.find(Delivery, {
      where: { delivery_status: "Reverse Delivery" },
    });
    return res.json({ success: true, data: deliveries });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Percentage of Deliveries by Stage (based on total deliveries)
export const getDeliveryStageBreakdown = async (
  _req: Request,
  res: Response
) => {
  try {
    const stages = [
      "At Sorting",
      "In Transit",
      "At Delivery Hub",
      "Assigned to Delivery",
      "Returned",
    ];

    // Get the total number of deliveries
    const totalDeliveries = await AppDataSource.manager.count(Delivery);

    if (totalDeliveries === 0) {
      return res.status(200).json({
        success: true,
        message: "No deliveries found",
        data: {},
      });
    }

    const breakdown: Record<string, string> = {};

    for (const stage of stages) {
      const count = await AppDataSource.manager.count(Delivery, {
        where: { delivery_status: stage },
      });

      breakdown[stage] = ((count / totalDeliveries) * 100).toFixed(2) + "%";
    }

    return res.status(200).json({
      success: true,
      message: "Delivery percentage by stage (based on total deliveries)",
      data: breakdown,
    });
  } catch (err) {
    console.error("Error calculating delivery breakdown:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
