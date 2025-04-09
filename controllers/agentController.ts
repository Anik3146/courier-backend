// src/controllers/agentController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Agent } from "../entities/Agent";

// Create Agent
export const createAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, balance, thanaId } = req.body;

  if (!name || !thanaId) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name and Thana are required",
        data: {},
      });
  }

  try {
    const agent = new Agent();
    agent.name = name;
    agent.balance = balance || 0;
    agent.thana = { id: thanaId }; // Assuming thanaId is provided

    await AppDataSource.manager.save(agent);
    return res
      .status(201)
      .json({
        success: true,
        message: "Agent created successfully",
        data: agent,
      });
  } catch (error) {
    console.error("Error creating agent:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error creating agent", data: {} });
  }
};

// Get all Agents
export const getAgents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const agents = await AppDataSource.manager.find(Agent, {
      relations: ["thana"],
    });
    return res
      .status(200)
      .json({
        success: true,
        message: "Agents fetched successfully",
        data: agents,
      });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching agents", data: [] });
  }
};

// Get Agent by ID
export const getAgentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: Number(id) },
      relations: ["thana", "pickupMen", "deliveryMen", "deliveries"],
    });

    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: "Agent not found", data: {} });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Agent fetched successfully",
        data: agent,
      });
  } catch (error) {
    console.error("Error fetching agent by ID:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching agent", data: {} });
  }
};

// Update Agent
export const updateAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { name, balance, thanaId } = req.body;

  try {
    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: Number(id) },
    });

    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: "Agent not found", data: {} });
    }

    agent.name = name || agent.name;
    agent.balance = balance || agent.balance;
    if (thanaId) {
      agent.thana = { id: thanaId }; // Assuming thanaId is provided
    }

    await AppDataSource.manager.save(agent);
    return res
      .status(200)
      .json({
        success: true,
        message: "Agent updated successfully",
        data: agent,
      });
  } catch (error) {
    console.error("Error updating agent:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating agent", data: {} });
  }
};

// Delete Agent
export const deleteAgent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const agent = await AppDataSource.manager.findOne(Agent, {
      where: { id: Number(id) },
    });

    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: "Agent not found", data: {} });
    }

    await AppDataSource.manager.remove(agent);
    return res
      .status(200)
      .json({ success: true, message: "Agent deleted successfully", data: {} });
  } catch (error) {
    console.error("Error deleting agent:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting agent", data: {} });
  }
};
