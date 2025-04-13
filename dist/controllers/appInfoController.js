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
exports.getAppInfoByEntityId = exports.addOrUpdateAppInfoForEntity = void 0;
const data_source_1 = require("../data-source");
const AppInfo_1 = require("../entities/AppInfo");
const Agent_1 = require("../entities/Agent");
const Operator_1 = require("../entities/Operator");
const Merchant_1 = require("../entities/Merchant");
const PickupMan_1 = require("../entities/PickupMan");
const DeliveryMan_1 = require("../entities/DeliveryMan");
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
// ✅ Add or Update App Info for User
const addOrUpdateAppInfoForEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appInfoRepo = data_source_1.AppDataSource.getRepository(AppInfo_1.AppInfo);
    try {
        const { title, subtitle, description, shareLink, privacyPolicy, latest_app_version, latest_ios_version, is_update_available, update_note, google_play_update_link, app_store_update_link, } = req.body;
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
        const entity = yield repo.findOne({
            where: { id: userId },
        });
        if (!entity) {
            return res.status(404).json({
                success: false,
                message: `${userType} with ID ${userId} not found.`,
                data: null,
            });
        }
        // Check if an app info already exists for this user
        const existingAppInfo = yield appInfoRepo.findOne({
            where: {
                [relationKey]: entity,
            },
        });
        if (existingAppInfo) {
            Object.assign(existingAppInfo, {
                title,
                subtitle,
                description,
                shareLink,
                privacyPolicy,
                latest_app_version,
                latest_ios_version,
                is_update_available,
                update_note,
                google_play_update_link,
                app_store_update_link,
                updatedAt: new Date(),
            });
            yield appInfoRepo.save(existingAppInfo);
            return res.status(200).json({
                success: true,
                message: `App info updated successfully for ${userType}.`,
                data: existingAppInfo,
            });
        }
        // Create new app info
        const newAppInfo = appInfoRepo.create({
            title,
            subtitle,
            description,
            shareLink,
            privacyPolicy,
            latest_app_version,
            latest_ios_version,
            is_update_available,
            update_note,
            google_play_update_link,
            app_store_update_link,
            createdAt: new Date(),
            updatedAt: new Date(),
            [relationKey]: entity,
        });
        yield appInfoRepo.save(newAppInfo);
        return res.status(201).json({
            success: true,
            message: `App info created and linked to ${userType} successfully.`,
            data: newAppInfo,
        });
    }
    catch (error) {
        console.error("Error in adding/updating app information:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
            data: null,
        });
    }
});
exports.addOrUpdateAppInfoForEntity = addOrUpdateAppInfoForEntity;
// ✅ Get App Info by User ID
const getAppInfoByEntityId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                message: `${userType} with ID ${userId} not found.`,
                data: null,
            });
        }
        const appInfo = yield data_source_1.AppDataSource.getRepository(AppInfo_1.AppInfo).findOne({
            where: {
                [relationKey]: entity,
            },
        });
        if (!appInfo) {
            return res.status(404).json({
                success: false,
                message: `No app info found for ${userType} with ID ${userId}.`,
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: `App info retrieved for ${userType} with ID ${userId}.`,
            data: appInfo,
        });
    }
    catch (error) {
        console.error("Error fetching app info by entity ID:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
            data: null,
        });
    }
});
exports.getAppInfoByEntityId = getAppInfoByEntityId;
