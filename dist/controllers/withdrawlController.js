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
exports.completeWithdrawal = exports.createWithdrawal = void 0;
const data_source_1 = require("../data-source");
const Withdrawl_1 = require("../entities/Withdrawl");
const Merchant_1 = require("../entities/Merchant");
const Agent_1 = require("../entities/Agent");
const PickupMan_1 = require("../entities/PickupMan");
const DeliveryMan_1 = require("../entities/DeliveryMan");
// Create Withdrawal
const createWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, user_type, amount, withdraw_method } = req.body;
    if (!user_id || !user_type || !amount || !withdraw_method) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
            data: {},
        });
    }
    try {
        let user;
        let updatedBalance = 0;
        // Find the user based on the user type and user_id
        if (user_type === "merchant") {
            user = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { id: user_id },
            });
        }
        else if (user_type === "agent") {
            user = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
                where: { id: user_id },
            });
        }
        else if (user_type === "pickupman") {
            user = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
                where: { id: user_id },
            });
        }
        else if (user_type === "deliveryman") {
            user = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
                where: { id: user_id },
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid user type",
                data: {},
            });
        }
        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `${user_type} not found`,
                data: {},
            });
        }
        // Check if the user has enough balance
        if (user.balance && user.balance < amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance",
                data: {},
            });
        }
        // Create the withdrawal record with status set to 'pending'
        const withdrawal = new Withdrawl_1.Withdrawal();
        withdrawal.user_id = user_id;
        withdrawal.user_type = user_type;
        withdrawal.amount = amount;
        withdrawal.withdraw_method = withdraw_method;
        withdrawal.status = "pending"; // Set the withdrawal status to 'pending'
        // Save withdrawal record to the database
        yield data_source_1.AppDataSource.manager.save(withdrawal);
        // Return success response with the 'pending' status
        return res.status(201).json({
            success: true,
            message: "Withdrawal created successfully, status set to pending",
            data: { withdrawal, updatedBalance: user.balance },
        });
    }
    catch (error) {
        console.error("Error creating withdrawal:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating withdrawal",
            data: {},
        });
    }
});
exports.createWithdrawal = createWithdrawal;
// Function to update withdrawal status to 'completed' and user balance after the withdrawal is processed
const completeWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { withdrawal_id } = req.body;
    if (!withdrawal_id) {
        return res.status(400).json({
            success: false,
            message: "Withdrawal ID is required",
            data: {},
        });
    }
    try {
        // Find the withdrawal by its ID
        const withdrawal = yield data_source_1.AppDataSource.manager.findOne(Withdrawl_1.Withdrawal, {
            where: { id: withdrawal_id },
        });
        if (!withdrawal) {
            return res.status(404).json({
                success: false,
                message: "Withdrawal not found",
                data: {},
            });
        }
        // Update the withdrawal status to 'completed'
        withdrawal.status = "completed";
        yield data_source_1.AppDataSource.manager.save(withdrawal);
        // Find the user based on the withdrawal user_type and user_id
        let user;
        if (withdrawal.user_type === "merchant") {
            user = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { id: withdrawal.user_id },
            });
        }
        else if (withdrawal.user_type === "agent") {
            user = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
                where: { id: withdrawal.user_id },
            });
        }
        else if (withdrawal.user_type === "pickup_man") {
            user = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
                where: { id: withdrawal.user_id },
            });
        }
        else if (withdrawal.user_type === "delivery_man") {
            user = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
                where: { id: withdrawal.user_id },
            });
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `${withdrawal.user_type} not found`,
                data: {},
            });
        }
        // Update the user's balance (assuming the withdrawal amount is being deducted from the balance)
        if (user.balance && withdrawal.amount) {
            user.balance -= withdrawal.amount;
            // Ensure the balance doesn't go below zero
            if (user.balance < 0) {
                user.balance = 0;
            }
        }
        yield data_source_1.AppDataSource.manager.save(user); // Save the updated balance
        // Return a response confirming the withdrawal completion
        return res.status(200).json({
            success: true,
            message: "Withdrawal completed successfully",
            data: { withdrawal, updatedBalance: user.balance },
        });
    }
    catch (error) {
        console.error("Error completing withdrawal:", error);
        return res.status(500).json({
            success: false,
            message: "Error completing withdrawal",
            data: {},
        });
    }
});
exports.completeWithdrawal = completeWithdrawal;
