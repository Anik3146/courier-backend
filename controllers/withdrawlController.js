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
exports.deleteWithdrawal = exports.updateWithdrawal = exports.getWithdrawalById = exports.getWithdrawals = exports.createWithdrawal = void 0;
const data_source_1 = require("../data-source");
const Withdrawl_1 = require("../entities/Withdrawl");
// Create Withdrawal
const createWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, user_type, amount, withdraw_method } = req.body;
    if (!user_id || !user_type || !amount || !withdraw_method) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const withdrawal = new Withdrawl_1.Withdrawal();
        withdrawal.user_id = user_id;
        withdrawal.user_type = user_type;
        withdrawal.amount = amount;
        withdrawal.withdraw_method = withdraw_method;
        yield data_source_1.AppDataSource.manager.save(withdrawal);
        return res
            .status(201)
            .json({ message: "Withdrawal created successfully", withdrawal });
    }
    catch (error) {
        console.error("Error creating withdrawal:", error);
        return res.status(500).json({ message: "Error creating withdrawal" });
    }
});
exports.createWithdrawal = createWithdrawal;
// Get all Withdrawals
const getWithdrawals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withdrawals = yield data_source_1.AppDataSource.manager.find(Withdrawl_1.Withdrawal);
        return res.status(200).json(withdrawals);
    }
    catch (error) {
        console.error("Error fetching withdrawals:", error);
        return res.status(500).json({ message: "Error fetching withdrawals" });
    }
});
exports.getWithdrawals = getWithdrawals;
// Get Withdrawal by ID
const getWithdrawalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const withdrawal = yield data_source_1.AppDataSource.manager.findOne(Withdrawl_1.Withdrawal, {
            where: { id: Number(id) },
        });
        if (!withdrawal) {
            return res.status(404).json({ message: "Withdrawal not found" });
        }
        return res.status(200).json(withdrawal);
    }
    catch (error) {
        console.error("Error fetching withdrawal by ID:", error);
        return res.status(500).json({ message: "Error fetching withdrawal" });
    }
});
exports.getWithdrawalById = getWithdrawalById;
// Update Withdrawal
const updateWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }
    try {
        const withdrawal = yield data_source_1.AppDataSource.manager.findOne(Withdrawl_1.Withdrawal, {
            where: { id: Number(id) },
        });
        if (!withdrawal) {
            return res.status(404).json({ message: "Withdrawal not found" });
        }
        withdrawal.status = status;
        yield data_source_1.AppDataSource.manager.save(withdrawal);
        return res
            .status(200)
            .json({ message: "Withdrawal updated successfully", withdrawal });
    }
    catch (error) {
        console.error("Error updating withdrawal:", error);
        return res.status(500).json({ message: "Error updating withdrawal" });
    }
});
exports.updateWithdrawal = updateWithdrawal;
// Delete Withdrawal
const deleteWithdrawal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const withdrawal = yield data_source_1.AppDataSource.manager.findOne(Withdrawl_1.Withdrawal, {
            where: { id: Number(id) },
        });
        if (!withdrawal) {
            return res.status(404).json({ message: "Withdrawal not found" });
        }
        yield data_source_1.AppDataSource.manager.remove(withdrawal);
        return res.status(200).json({ message: "Withdrawal deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting withdrawal:", error);
        return res.status(500).json({ message: "Error deleting withdrawal" });
    }
});
exports.deleteWithdrawal = deleteWithdrawal;
