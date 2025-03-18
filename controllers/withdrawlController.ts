import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Withdrawal } from "../entities/Withdrawl";
import { Merchant } from "../entities/Merchant";
import { Agent } from "../entities/Agent";
import { PickupMan } from "../entities/PickupMan";
import { DeliveryMan } from "../entities/DeliveryMan";

export const createWithdrawal = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user_id, user_type, amount, withdraw_method } = req.body;

  if (!user_id || !user_type || !amount || !withdraw_method) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let user;
    let updatedBalance = 0;

    // Find the user based on the user type and user_id
    if (user_type === "merchant") {
      user = await AppDataSource.manager.findOne(Merchant, {
        where: { id: user_id },
      });
    } else if (user_type === "agent") {
      user = await AppDataSource.manager.findOne(Agent, {
        where: { id: user_id },
      });
    } else if (user_type === "pickupman") {
      user = await AppDataSource.manager.findOne(PickupMan, {
        where: { id: user_id },
      });
    } else if (user_type === "deliveryman") {
      user = await AppDataSource.manager.findOne(DeliveryMan, {
        where: { id: user_id },
      });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: `${user_type} not found` });
    }

    // Check if the user has enough balance
    if (user.balance && user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct the withdrawal amount from the user's balance
    if (user.balance) user.balance -= amount;
    await AppDataSource.manager.save(user); // Save updated balance

    // Create the withdrawal record
    const withdrawal = new Withdrawal();
    withdrawal.user_id = user_id;
    withdrawal.user_type = user_type;
    withdrawal.amount = amount;
    withdrawal.withdraw_method = withdraw_method;

    // Save withdrawal record to the database
    await AppDataSource.manager.save(withdrawal);

    // Return success response
    return res.status(201).json({
      message: "Withdrawal created successfully",
      withdrawal,
      updatedBalance: user.balance,
    });
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    return res.status(500).json({ message: "Error creating withdrawal" });
  }
};
