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
exports.createWithdrawal = void 0;
const data_source_1 = require("../data-source");
const Withdrawl_1 = require("../entities/Withdrawl");
const Merchant_1 = require("../entities/Merchant");
const Agent_1 = require("../entities/Agent");
const PickupMan_1 = require("../entities/PickupMan");
const DeliveryMan_1 = require("../entities/DeliveryMan");
const createWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, user_type, amount, withdraw_method } = req.body;
    if (!user_id || !user_type || !amount || !withdraw_method) {
        return res.status(400).json({ message: "All fields are required" });
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
            return res.status(400).json({ message: "Invalid user type" });
        }
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: `${user_type} not found` });
        }
        // Check if the user has enough balance
        if (user.balance && user.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        // Deduct the withdrawal amount from the user's balance
        if (user.balance)
            user.balance -= amount;
        yield data_source_1.AppDataSource.manager.save(user); // Save updated balance
        // Create the withdrawal record
        const withdrawal = new Withdrawl_1.Withdrawal();
        withdrawal.user_id = user_id;
        withdrawal.user_type = user_type;
        withdrawal.amount = amount;
        withdrawal.withdraw_method = withdraw_method;
        // Save withdrawal record to the database
        yield data_source_1.AppDataSource.manager.save(withdrawal);
        // Return success response
        return res.status(201).json({
            message: "Withdrawal created successfully",
            withdrawal,
            updatedBalance: user.balance,
        });
    }
    catch (error) {
        console.error("Error creating withdrawal:", error);
        return res.status(500).json({ message: "Error creating withdrawal" });
    }
});
exports.createWithdrawal = createWithdrawal;
