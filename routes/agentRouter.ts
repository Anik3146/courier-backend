// src/routes/agentRoutes.ts
import { Router } from "express";
import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from "../controllers/agentController";

const router = Router();

// Routes for Agent

// Create Agent
router.post("/", async (req, res) => {
  try {
    await createAgent(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in creating agent:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get all Agents
router.get("/", async (req, res) => {
  try {
    await getAgents(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching agents:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get Agent by ID
router.get("/:id", async (req, res) => {
  try {
    await getAgentById(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching agent by ID:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update Agent
router.put("/:id", async (req, res) => {
  try {
    await updateAgent(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in updating agent:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Delete Agent
router.delete("/:id", async (req, res) => {
  try {
    await deleteAgent(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in deleting agent:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
