import { Router } from "express";
import {
  postMessage,
  getMessageById,
  getMessagesByUserId,
} from "../controllers/messageController";

const router = Router();

// Create Message (POST)
router.post("/", async (req, res) => {
  try {
    await postMessage(req, res);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message.",
      data: null,
    });
  }
});

// Get Message by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    await getMessageById(req, res);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch message.",
      data: null,
    });
  }
});

// Get messages by user ID and type
router.get("/user/:id", async (req, res) => {
  try {
    await getMessagesByUserId(req, res);
  } catch (error) {
    console.error("Error fetching user messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
      data: null,
    });
  }
});

export default router;
