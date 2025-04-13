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
// ✅ Utility function to return proper repository and relation key
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
// ✅ Main controller function
const addOrUpdateAppInfoForEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appInfoRepo = data_source_1.AppDataSource.getRepository(AppInfo_1.AppInfo); // Repo for AppInfo
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
        // Get repo and relation key based on userType
        const { repo, relationKey } = getEntityRepoAndRelation(userType);
        // Fetch entity with app_info relation
        const entity = yield repo.findOne({
            where: { id: userId },
            relations: ["app_info"],
        });
        if (!entity) {
            return res.status(404).json({
                success: false,
                message: `${userType} with ID ${userId} not found.`,
                data: null,
            });
        }
        // Check if app_info exists
        let appInfo = entity.app_info || null;
        if (appInfo) {
            // If appInfo exists, update it
            appInfo.title = title !== null && title !== void 0 ? title : appInfo.title;
            appInfo.subtitle = subtitle !== null && subtitle !== void 0 ? subtitle : appInfo.subtitle;
            appInfo.description = description !== null && description !== void 0 ? description : appInfo.description;
            appInfo.shareLink = shareLink !== null && shareLink !== void 0 ? shareLink : appInfo.shareLink;
            appInfo.privacyPolicy = privacyPolicy !== null && privacyPolicy !== void 0 ? privacyPolicy : appInfo.privacyPolicy;
            appInfo.latest_app_version =
                latest_app_version !== null && latest_app_version !== void 0 ? latest_app_version : appInfo.latest_app_version;
            appInfo.latest_ios_version =
                latest_ios_version !== null && latest_ios_version !== void 0 ? latest_ios_version : appInfo.latest_ios_version;
            appInfo.is_update_available =
                is_update_available !== null && is_update_available !== void 0 ? is_update_available : appInfo.is_update_available;
            appInfo.update_note = update_note !== null && update_note !== void 0 ? update_note : appInfo.update_note;
            appInfo.google_play_update_link =
                google_play_update_link !== null && google_play_update_link !== void 0 ? google_play_update_link : appInfo.google_play_update_link;
            appInfo.app_store_update_link =
                app_store_update_link !== null && app_store_update_link !== void 0 ? app_store_update_link : appInfo.app_store_update_link;
            appInfo.updatedAt = new Date();
            // Save the updated appInfo
            yield appInfoRepo.save(appInfo);
            return res.status(200).json({
                success: true,
                message: `App info updated successfully for ${userType}.`,
                data: appInfo,
            });
        }
        else {
            // If appInfo does not exist, create a new one
            appInfo = appInfoRepo.create({
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
            });
            // Save new appInfo
            yield appInfoRepo.save(appInfo);
            // Link new appInfo to the user entity
            entity.app_info = appInfo;
            // Save the entity with the newly linked app info
            yield repo.save(entity);
            return res.status(201).json({
                success: true,
                message: `App info added and linked to ${userType} successfully.`,
                data: appInfo,
            });
        }
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
//get by id
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
        // Get the correct repository
        const { repo } = getEntityRepoAndRelation(userType);
        // Fetch the entity including app_info relation
        const entity = yield repo.findOne({
            where: { id: userId },
            relations: ["app_info"],
        });
        if (!entity) {
            return res.status(404).json({
                success: false,
                message: `${userType} with ID ${userId} not found.`,
                data: null,
            });
        }
        const appInfo = entity.app_info;
        if (!appInfo) {
            return res.status(404).json({
                success: false,
                message: `App info not found for ${userType} with ID ${userId}.`,
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
