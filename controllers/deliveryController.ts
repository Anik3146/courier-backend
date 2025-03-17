// src/controllers/deliveryController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; // DB connection
import { Merchant } from "../entities/Merchant";
import { Delivery } from "../entities/Delivery";

export const createDelivery = (req: Request, res: Response) => {
  // The outer function is synchronous
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
    } = req.body;

    // Basic validation
    if (!store_name || !product_type || !recipient_name || !recipient_phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // Find the merchant in the database
      const merchant = await AppDataSource.manager.findOne(Merchant, {
        where: { id: merchant_id },
      });

      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }

      // Create a new delivery
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

      // Save the new delivery to the database
      await AppDataSource.manager.save(delivery);
      return res.status(201).json(delivery);
    } catch (error) {
      console.error("Error saving delivery:", error);
      return res.status(500).json({ message: "Error saving delivery" });
    }
  };

  // Call the inner async function
  createNewDelivery().catch((err) => {
    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  });
};
