// src/controllers/withdrawalController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Withdrawal } from "../entities/Withdrawl";

// Create Withdrawal
export const createWithdrawal = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user_id, user_type, amount, withdraw_method } = req.body;

  if (!user_id || !user_type || !amount || !withdraw_method) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const withdrawal = new Withdrawal();
    withdrawal.user_id = user_id;
    withdrawal.user_type = user_type;
    withdrawal.amount = amount;
    withdrawal.withdraw_method = withdraw_method;

    await AppDataSource.manager.save(withdrawal);
    return res
      .status(201)
      .json({ message: "Withdrawal created successfully", withdrawal });
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    return res.status(500).json({ message: "Error creating withdrawal" });
  }
};

// Get all Withdrawals
export const getWithdrawals = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const withdrawals = await AppDataSource.manager.find(Withdrawal);
    return res.status(200).json(withdrawals);
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    return res.status(500).json({ message: "Error fetching withdrawals" });
  }
};

// Get Withdrawal by ID
export const getWithdrawalById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const withdrawal = await AppDataSource.manager.findOne(Withdrawal, {
      where: { id: Number(id) },
    });

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal not found" });
    }

    return res.status(200).json(withdrawal);
  } catch (error) {
    console.error("Error fetching withdrawal by ID:", error);
    return res.status(500).json({ message: "Error fetching withdrawal" });
  }
};

// Update Withdrawal
export const updateWithdrawal = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const withdrawal = await AppDataSource.manager.findOne(Withdrawal, {
      where: { id: Number(id) },
    });

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal not found" });
    }

    withdrawal.status = status;

    await AppDataSource.manager.save(withdrawal);
    return res
      .status(200)
      .json({ message: "Withdrawal updated successfully", withdrawal });
  } catch (error) {
    console.error("Error updating withdrawal:", error);
    return res.status(500).json({ message: "Error updating withdrawal" });
  }
};

// Delete Withdrawal
export const deleteWithdrawal = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const withdrawal = await AppDataSource.manager.findOne(Withdrawal, {
      where: { id: Number(id) },
    });

    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal not found" });
    }

    await AppDataSource.manager.remove(withdrawal);
    return res.status(200).json({ message: "Withdrawal deleted successfully" });
  } catch (error) {
    console.error("Error deleting withdrawal:", error);
    return res.status(500).json({ message: "Error deleting withdrawal" });
  }
};
