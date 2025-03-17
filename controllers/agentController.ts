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
    return res.status(400).json({ message: "Name and Thana are required" });
  }

  try {
    const agent = new Agent();
    agent.name = name;
    agent.balance = balance || 0;
    agent.thana = { id: thanaId }; // Assuming thanaId is provided

    await AppDataSource.manager.save(agent);
    return res
      .status(201)
      .json({ message: "Agent created successfully", agent });
  } catch (error) {
    console.error("Error creating agent:", error);
    return res.status(500).json({ message: "Error creating agent" });
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
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return res.status(500).json({ message: "Error fetching agents" });
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
      return res.status(404).json({ message: "Agent not found" });
    }

    return res.status(200).json(agent);
  } catch (error) {
    console.error("Error fetching agent by ID:", error);
    return res.status(500).json({ message: "Error fetching agent" });
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
      return res.status(404).json({ message: "Agent not found" });
    }

    agent.name = name || agent.name;
    agent.balance = balance || agent.balance;
    if (thanaId) {
      agent.thana = { id: thanaId }; // Assuming thanaId is provided
    }

    await AppDataSource.manager.save(agent);
    return res
      .status(200)
      .json({ message: "Agent updated successfully", agent });
  } catch (error) {
    console.error("Error updating agent:", error);
    return res.status(500).json({ message: "Error updating agent" });
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
      return res.status(404).json({ message: "Agent not found" });
    }

    await AppDataSource.manager.remove(agent);
    return res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error("Error deleting agent:", error);
    return res.status(500).json({ message: "Error deleting agent" });
  }
};
