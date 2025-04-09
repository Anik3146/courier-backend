import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Withdrawal } from "../entities/Withdrawl";
import { Merchant } from "../entities/Merchant";
import { Agent } from "../entities/Agent";
import { PickupMan } from "../entities/PickupMan";
import { DeliveryMan } from "../entities/DeliveryMan";

// Create Withdrawal
export const createWithdrawal = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user_id, user_type, amount, withdraw_method } = req.body;

  if (!user_id || !user_type || !amount || !withdraw_method) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
      data: {},
    });
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
      return res.status(400).json({
        success: false,
        message: "Invalid user type",
        data: {},
      });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `${user_type} not found`,
        data: {},
      });
    }

    // Check if the user has enough balance
    if (user.balance && user.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
        data: {},
      });
    }

    // Create the withdrawal record with status set to 'pending'
    const withdrawal = new Withdrawal();
    withdrawal.user_id = user_id;
    withdrawal.user_type = user_type;
    withdrawal.amount = amount;
    withdrawal.withdraw_method = withdraw_method;
    withdrawal.status = "pending"; // Set the withdrawal status to 'pending'

    // Save withdrawal record to the database
    await AppDataSource.manager.save(withdrawal);

    // Return success response with the 'pending' status
    return res.status(201).json({
      success: true,
      message: "Withdrawal created successfully, status set to pending",
      data: { withdrawal, updatedBalance: user.balance },
    });
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating withdrawal",
      data: {},
    });
  }
};

// Function to update withdrawal status to 'completed' and user balance after the withdrawal is processed
export const completeWithdrawal = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { withdrawal_id } = req.body;

  if (!withdrawal_id) {
    return res.status(400).json({
      success: false,
      message: "Withdrawal ID is required",
      data: {},
    });
  }

  try {
    // Find the withdrawal by its ID
    const withdrawal = await AppDataSource.manager.findOne(Withdrawal, {
      where: { id: withdrawal_id },
    });

    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal not found",
        data: {},
      });
    }

    // Update the withdrawal status to 'completed'
    withdrawal.status = "completed";
    await AppDataSource.manager.save(withdrawal);

    // Find the user based on the withdrawal user_type and user_id
    let user;
    if (withdrawal.user_type === "merchant") {
      user = await AppDataSource.manager.findOne(Merchant, {
        where: { id: withdrawal.user_id },
      });
    } else if (withdrawal.user_type === "agent") {
      user = await AppDataSource.manager.findOne(Agent, {
        where: { id: withdrawal.user_id },
      });
    } else if (withdrawal.user_type === "pickup_man") {
      user = await AppDataSource.manager.findOne(PickupMan, {
        where: { id: withdrawal.user_id },
      });
    } else if (withdrawal.user_type === "delivery_man") {
      user = await AppDataSource.manager.findOne(DeliveryMan, {
        where: { id: withdrawal.user_id },
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `${withdrawal.user_type} not found`,
        data: {},
      });
    }

    // Update the user's balance (assuming the withdrawal amount is being deducted from the balance)
    if (user.balance && withdrawal.amount) {
      user.balance -= withdrawal.amount;

      // Ensure the balance doesn't go below zero
      if (user.balance < 0) {
        user.balance = 0;
      }
    }

    await AppDataSource.manager.save(user); // Save the updated balance

    // Return a response confirming the withdrawal completion
    return res.status(200).json({
      success: true,
      message: "Withdrawal completed successfully",
      data: { withdrawal, updatedBalance: user.balance },
    });
  } catch (error) {
    console.error("Error completing withdrawal:", error);
    return res.status(500).json({
      success: false,
      message: "Error completing withdrawal",
      data: {},
    });
  }
};
