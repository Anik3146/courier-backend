"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByUserId = exports.getMessageById = exports.postMessage = void 0;
const data_source_1 = require("../data-source");
const Message_1 = require("../entities/Message");
// Get the repository for Message
const messageRepo = data_source_1.AppDataSource.getRepository(Message_1.Message);
// POST: Create a new message
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, senderType, senderId, receiverType, receiverId } = req.body;
        // Create a new message object
        const message = messageRepo.create({
            content,
            senderType,
            senderId,
            receiverType,
            receiverId,
        });
        // Save the new message in the database
        const savedMessage = yield messageRepo.save(message);
        res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: savedMessage,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error sending message.",
            data: null,
        });
    }
});
exports.postMessage = postMessage;
// GET: Get a message by its ID
const getMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the message by ID
        const message = yield messageRepo.findOne({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching message.",
            data: null,
        });
    }
});
exports.getMessageById = getMessageById;
// Get messages by user ID and type (sender or receiver)
const getMessagesByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.id;
        const userType = req.query.type;
        if (!userType) {
            return res.status(400).json({
                success: false,
                message: "Missing user type in query (?type=merchant|agent|...).",
                data: null,
            });
        }
        const messages = yield messageRepo.find({
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
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages.",
            data: null,
        });
    }
});
exports.getMessagesByUserId = getMessagesByUserId;
