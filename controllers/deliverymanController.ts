// src/controllers/deliveryManController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DeliveryMan } from "../entities/DeliveryMan";
import { Agent } from "../entities/Agent";
import { Thana } from "../entities/Thana";

// Create DeliveryMan
export const createDeliveryMan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, balance, agentId, thanaId } = req.body;

  if (!name || balance === undefined || !agentId || !thanaId) {
    return res.status(400).json({
      message: "All fields (name, balance, agent, thana) are required",
    });
  }

  try {
    // Find associated Agent and Thana
    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: agentId },
    });
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: thanaId },
    });

    if (!agent || !thana) {
      return res.status(404).json({ message: "Agent or Thana not found" });
    }

    const deliveryMan = new DeliveryMan();
    deliveryMan.name = name;
    deliveryMan.balance = balance;
    deliveryMan.agent = agent;
    deliveryMan.thana = thana;

    // Save the new delivery man to the database
    await AppDataSource.manager.save(deliveryMan);
    return res
      .status(201)
      .json({ message: "Delivery Man created successfully", deliveryMan });
  } catch (error) {
    console.error("Error creating delivery man:", error);
    return res.status(500).json({ message: "Error creating delivery man" });
  }
};

// Get all DeliveryMen
export const getDeliveryMen = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deliveryMen = await AppDataSource.manager.find(DeliveryMan, {
      relations: ["agent", "thana"], // Fetch relations (agent, thana)
    });
    return res.status(200).json(deliveryMen);
  } catch (error) {
    console.error("Error fetching delivery men:", error);
    return res.status(500).json({ message: "Error fetching delivery men" });
  }
};

// Get DeliveryMan by ID
export const getDeliveryManById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const deliveryMan = await AppDataSource.manager.findOne(DeliveryMan, {
      where: { id: Number(id) },
      relations: ["agent", "thana"],
    });

    if (!deliveryMan) {
      return res.status(404).json({ message: "Delivery Man not found" });
    }

    return res.status(200).json(deliveryMan);
  } catch (error) {
    console.error("Error fetching delivery man by ID:", error);
    return res.status(500).json({ message: "Error fetching delivery man" });
  }
};

// Update DeliveryMan
export const updateDeliveryMan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { name, balance, agentId, thanaId } = req.body;

  if (!name || balance === undefined || !agentId || !thanaId) {
    return res.status(400).json({
      message: "All fields (name, balance, agent, thana) are required",
    });
  }

  try {
    const deliveryMan = await AppDataSource.manager.findOne(DeliveryMan, {
      where: { id: Number(id) },
    });

    if (!deliveryMan) {
      return res.status(404).json({ message: "Delivery Man not found" });
    }

    // Find associated Agent and Thana
    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: agentId },
    });
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: thanaId },
    });

    if (!agent || !thana) {
      return res.status(404).json({ message: "Agent or Thana not found" });
    }

    // Update delivery man fields
    deliveryMan.name = name;
    deliveryMan.balance = balance;
    deliveryMan.agent = agent;
    deliveryMan.thana = thana;

    // Save the updated delivery man to the database
    await AppDataSource.manager.save(deliveryMan);
    return res
      .status(200)
      .json({ message: "Delivery Man updated successfully", deliveryMan });
  } catch (error) {
    console.error("Error updating delivery man:", error);
    return res.status(500).json({ message: "Error updating delivery man" });
  }
};

// Delete DeliveryMan
export const deleteDeliveryMan = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const deliveryMan = await AppDataSource.manager.findOne(DeliveryMan, {
      where: { id: Number(id) },
    });

    if (!deliveryMan) {
      return res.status(404).json({ message: "Delivery Man not found" });
    }

    // Delete the delivery man from the database
    await AppDataSource.manager.remove(deliveryMan);
    return res
      .status(200)
      .json({ message: "Delivery Man deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery man:", error);
    return res.status(500).json({ message: "Error deleting delivery man" });
  }
};
