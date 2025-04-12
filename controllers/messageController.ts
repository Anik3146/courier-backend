import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Message } from "../entities/Message";

// Get the repository for Message
const messageRepo = AppDataSource.getRepository(Message);

// POST: Create a new message
export const postMessage = async (req: Request, res: Response) => {
  try {
    const { content, senderType, senderId, receiverType, receiverId } =
      req.body;

    // Create a new message object
    const message = messageRepo.create({
      content,
      senderType,
      senderId,
      receiverType,
      receiverId,
    });

    // Save the new message in the database
    const savedMessage = await messageRepo.save(message);

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error sending message.",
      data: null,
    });
  }
};

// GET: Get a message by its ID
export const getMessageById = async (req: Request, res: Response) => {
  try {
    // Fetch the message by ID
    const message = await messageRepo.findOne({
      where: { id: +req.params.id },
      relations: [
        "merchantSender",
        "agentSender",
        "pickupManSender",
        "deliveryManSender",
        "merchantReceiver",
        "agentReceiver",
        "pickupManReceiver",
        "deliveryManReceiver",
      ],
    });

    // If the message is not found, return a 404 error
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Message fetched successfully.",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching message.",
      data: null,
    });
  }
};

// Get messages by user ID and type (sender or receiver)
export const getMessagesByUserId = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.id;
    const userType = req.query.type as
      | "merchant"
      | "agent"
      | "pickupMan"
      | "deliveryMan";

    if (!userType) {
      return res.status(400).json({
        success: false,
        message: "Missing user type in query (?type=merchant|agent|...).",
        data: null,
      });
    }

    const messages = await messageRepo.find({
      where: [
        { senderId: userId, senderType: userType },
        { receiverId: userId, receiverType: userType },
      ],
      order: { timestamp: "DESC" },
      relations: [
        "merchantSender",
        "agentSender",
        "pickupManSender",
        "deliveryManSender",
        "merchantReceiver",
        "agentReceiver",
        "pickupManReceiver",
        "deliveryManReceiver",
      ],
    });

    res.json({
      success: true,
      message: "Messages fetched successfully.",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
      data: null,
    });
  }
};
