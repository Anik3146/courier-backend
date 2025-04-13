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
exports.getActivityLogsByEntityId = exports.addActivityLogForEntity = void 0;
const data_source_1 = require("../data-source");
const ActivityLog_1 = require("../entities/ActivityLog");
const Agent_1 = require("../entities/Agent");
const Operator_1 = require("../entities/Operator");
const Merchant_1 = require("../entities/Merchant");
const PickupMan_1 = require("../entities/PickupMan");
const DeliveryMan_1 = require("../entities/DeliveryMan");
// 🔁 Reuse utility for repo + relation key
const getEntityRepoAndRelation = (userType) => {
    switch (userType.toLowerCase()) {
        case "agent":
            return {
                repo: data_source_1.AppDataSource.getRepository(Agent_1.Agent),
                relationKey: "agent",
            };
        case "operator":
            return {
                repo: data_source_1.AppDataSource.getRepository(Operator_1.Operator),
                relationKey: "operator",
            };
        case "merchant":
            return {
                repo: data_source_1.AppDataSource.getRepository(Merchant_1.Merchant),
                relationKey: "merchant",
            };
        case "pickupman":
            return {
                repo: data_source_1.AppDataSource.getRepository(PickupMan_1.PickupMan),
                relationKey: "pickupMan",
            };
        case "deliveryman":
            return {
                repo: data_source_1.AppDataSource.getRepository(DeliveryMan_1.DeliveryMan),
                relationKey: "deliveryMan",
            };
        default:
            throw new Error("Invalid user type");
    }
};
// ✅ Add Activity Log
const addActivityLogForEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityRepo = data_source_1.AppDataSource.getRepository(ActivityLog_1.ActivityLog);
    try {
        const { activity, activity_time, newAppuserId, email, phone_no, device_id, IMEI, latitude, longitude, } = req.body;
        const userId = Number(req.params.userId);
        const userType = req.query.userType;
        if (!userId || !userType) {
            return res.status(400).json({
                success: false,
                message: "userId and userType are required.",
                data: null,
            });
        }
        const { repo, relationKey } = getEntityRepoAndRelation(userType);
        const entity = yield repo.findOne({ where: { id: userId } });
        if (!entity) {
            return res.status(404).json({
                success: false,
                message: `${userType} not found.`,
                data: null,
            });
        }
        const newActivity = activityRepo.create({
            activity,
            activity_time,
            newAppuserId,
            email,
            phone_no,
            device_id,
            IMEI,
            latitude,
            longitude,
            [relationKey]: entity,
        });
        yield activityRepo.save(newActivity);
        return res.status(201).json({
            success: true,
            message: `Activity log added for ${userType} successfully.`,
            data: newActivity,
        });
    }
    catch (error) {
        console.error("Error adding activity log:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
            data: null,
        });
    }
});
exports.addActivityLogForEntity = addActivityLogForEntity;
// ✅ Get all activity logs for a user
const getActivityLogsByEntityId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityRepo = data_source_1.AppDataSource.getRepository(ActivityLog_1.ActivityLog);
    try {
        const userId = Number(req.params.userId);
        const userType = req.query.userType;
        if (!userId || !userType) {
            return res.status(400).json({
                success: false,
                message: "userId and userType are required.",
                data: null,
            });
        }
        const { repo, relationKey } = getEntityRepoAndRelation(userType);
        const entity = yield repo.findOne({ where: { id: userId } });
        if (!entity) {
            return res.status(404).json({
                success: false,
                message: `${userType} not found.`,
                data: null,
            });
        }
        const logs = yield activityRepo.find({
            where: {
                [relationKey]: entity,
            },
            order: { createdAt: "DESC" },
        });
        return res.status(200).json({
            success: true,
            message: `Activity logs retrieved for ${userType} with ID ${userId}.`,
            data: logs,
        });
    }
    catch (error) {
        console.error("Error fetching activity logs:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
            data: null,
        });
    }
});
exports.getActivityLogsByEntityId = getActivityLogsByEntityId;
