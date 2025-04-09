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
      success: false,
      message: "All fields (name, balance, agent, thana) are required",
      data: {},
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
      return res.status(404).json({
        success: false,
        message: "Agent or Thana not found",
        data: {},
      });
    }

    const deliveryMan = new DeliveryMan();
    deliveryMan.name = name;
    deliveryMan.balance = balance;
    deliveryMan.agent = agent;
    deliveryMan.thana = thana;

    // Save the new delivery man to the database
    await AppDataSource.manager.save(deliveryMan);
    return res.status(201).json({
      success: true,
      message: "Delivery Man created successfully",
      data: deliveryMan,
    });
  } catch (error) {
    console.error("Error creating delivery man:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating delivery man",
      data: {},
    });
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
    return res.status(200).json({
      success: true,
      message: "Delivery Men fetched successfully",
      data: deliveryMen,
    });
  } catch (error) {
    console.error("Error fetching delivery men:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching delivery men",
      data: {},
    });
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
      return res.status(404).json({
        success: false,
        message: "Delivery Man not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery Man fetched successfully",
      data: deliveryMan,
    });
  } catch (error) {
    console.error("Error fetching delivery man by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching delivery man",
      data: {},
    });
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
      success: false,
      message: "All fields (name, balance, agent, thana) are required",
      data: {},
    });
  }

  try {
    const deliveryMan = await AppDataSource.manager.findOne(DeliveryMan, {
      where: { id: Number(id) },
    });

    if (!deliveryMan) {
      return res.status(404).json({
        success: false,
        message: "Delivery Man not found",
        data: {},
      });
    }

    // Find associated Agent and Thana
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

    // Update delivery man fields
    deliveryMan.name = name;
    deliveryMan.balance = balance;
    deliveryMan.agent = agent;
    deliveryMan.thana = thana;

    // Save the updated delivery man to the database
    await AppDataSource.manager.save(deliveryMan);
    return res.status(200).json({
      success: true,
      message: "Delivery Man updated successfully",
      data: deliveryMan,
    });
  } catch (error) {
    console.error("Error updating delivery man:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating delivery man",
      data: {},
    });
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
      return res.status(404).json({
        success: false,
        message: "Delivery Man not found",
        data: {},
      });
    }

    // Delete the delivery man from the database
    await AppDataSource.manager.remove(deliveryMan);
    return res.status(200).json({
      success: true,
      message: "Delivery Man deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error deleting delivery man:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting delivery man",
      data: {},
    });
  }
};
