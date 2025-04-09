// src/controllers/pickupManController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PickupMan } from "../entities/PickupMan";
import { Agent } from "../entities/Agent";
import { Thana } from "../entities/Thana";

// Create PickupMan
export const createPickupMan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, balance, agentId, thanaId } = req.body;

  if (!name || balance === undefined || !agentId || !thanaId) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, balance, agent, thana) are required",
      data: {},
    });
  }

  try {
    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: agentId },
    });
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: thanaId },
    });

    if (!agent || !thana) {
      return res.status(404).json({
        success: false,
        message: "Agent or Thana not found",
        data: {},
      });
    }

    const pickupMan = new PickupMan();
    pickupMan.name = name;
    pickupMan.balance = balance;
    pickupMan.agent = agent;
    pickupMan.thana = thana;

    await AppDataSource.manager.save(pickupMan);
    return res.status(201).json({
      success: true,
      message: "Pickup Man created successfully",
      data: pickupMan,
    });
  } catch (error) {
    console.error("Error creating pickup man:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating pickup man",
      data: {},
    });
  }
};

// Get all Pickup Men
export const getPickupMen = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const pickupMen = await AppDataSource.manager.find(PickupMan, {
      relations: ["agent", "thana"],
    });
    return res.status(200).json({
      success: true,
      message: "Pickup Men fetched successfully",
      data: pickupMen,
    });
  } catch (error) {
    console.error("Error fetching pickup men:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching pickup men",
      data: {},
    });
  }
};

// Get Pickup Man by ID
export const getPickupManById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const pickupMan = await AppDataSource.manager.findOne(PickupMan, {
      where: { id: Number(id) },
      relations: ["agent", "thana"],
    });

    if (!pickupMan) {
      return res.status(404).json({
        success: false,
        message: "Pickup Man not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pickup Man fetched successfully",
      data: pickupMan,
    });
  } catch (error) {
    console.error("Error fetching pickup man by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching pickup man",
      data: {},
    });
  }
};

// Update Pickup Man
export const updatePickupMan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { name, balance, agentId, thanaId } = req.body;

  if (!name || balance === undefined || !agentId || !thanaId) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, balance, agent, thana) are required",
      data: {},
    });
  }

  try {
    const pickupMan = await AppDataSource.manager.findOne(PickupMan, {
      where: { id: Number(id) },
    });

    if (!pickupMan) {
      return res.status(404).json({
        success: false,
        message: "Pickup Man not found",
        data: {},
      });
    }

    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: agentId },
    });
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: thanaId },
    });

    if (!agent || !thana) {
      return res.status(404).json({
        success: false,
        message: "Agent or Thana not found",
        data: {},
      });
    }

    pickupMan.name = name;
    pickupMan.balance = balance;
    pickupMan.agent = agent;
    pickupMan.thana = thana;

    await AppDataSource.manager.save(pickupMan);
    return res.status(200).json({
      success: true,
      message: "Pickup Man updated successfully",
      data: pickupMan,
    });
  } catch (error) {
    console.error("Error updating pickup man:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating pickup man",
      data: {},
    });
  }
};

// Delete Pickup Man
export const deletePickupMan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const pickupMan = await AppDataSource.manager.findOne(PickupMan, {
      where: { id: Number(id) },
    });

    if (!pickupMan) {
      return res.status(404).json({
        success: false,
        message: "Pickup Man not found",
        data: {},
      });
    }

    await AppDataSource.manager.remove(pickupMan);
    return res.status(200).json({
      success: true,
      message: "Pickup Man deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error deleting pickup man:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting pickup man",
      data: {},
    });
  }
};
