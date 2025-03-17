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
    return res
      .status(400)
      .json({
        message: "All fields (name, balance, agent, thana) are required",
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
      return res.status(404).json({ message: "Agent or Thana not found" });
    }

    const pickupMan = new PickupMan();
    pickupMan.name = name;
    pickupMan.balance = balance;
    pickupMan.agent = agent;
    pickupMan.thana = thana;

    await AppDataSource.manager.save(pickupMan);
    return res
      .status(201)
      .json({ message: "Pickup Man created successfully", pickupMan });
  } catch (error) {
    console.error("Error creating pickup man:", error);
    return res.status(500).json({ message: "Error creating pickup man" });
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
    return res.status(200).json(pickupMen);
  } catch (error) {
    console.error("Error fetching pickup men:", error);
    return res.status(500).json({ message: "Error fetching pickup men" });
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
      return res.status(404).json({ message: "Pickup Man not found" });
    }

    return res.status(200).json(pickupMan);
  } catch (error) {
    console.error("Error fetching pickup man by ID:", error);
    return res.status(500).json({ message: "Error fetching pickup man" });
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
    return res
      .status(400)
      .json({
        message: "All fields (name, balance, agent, thana) are required",
      });
  }

  try {
    const pickupMan = await AppDataSource.manager.findOne(PickupMan, {
      where: { id: Number(id) },
    });

    if (!pickupMan) {
      return res.status(404).json({ message: "Pickup Man not found" });
    }

    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: agentId },
    });
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: thanaId },
    });

    if (!agent || !thana) {
      return res.status(404).json({ message: "Agent or Thana not found" });
    }

    pickupMan.name = name;
    pickupMan.balance = balance;
    pickupMan.agent = agent;
    pickupMan.thana = thana;

    await AppDataSource.manager.save(pickupMan);
    return res
      .status(200)
      .json({ message: "Pickup Man updated successfully", pickupMan });
  } catch (error) {
    console.error("Error updating pickup man:", error);
    return res.status(500).json({ message: "Error updating pickup man" });
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
      return res.status(404).json({ message: "Pickup Man not found" });
    }

    await AppDataSource.manager.remove(pickupMan);
    return res.status(200).json({ message: "Pickup Man deleted successfully" });
  } catch (error) {
    console.error("Error deleting pickup man:", error);
    return res.status(500).json({ message: "Error deleting pickup man" });
  }
};
