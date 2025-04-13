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
exports.getDeviceInfoByEntityId = exports.addOrUpdateDeviceInfoForEntity = void 0;
const data_source_1 = require("../data-source");
const DeviceInfo_1 = require("../entities/DeviceInfo");
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
// ✅ Add or Update Device Info for Entity
const addOrUpdateDeviceInfoForEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceRepo = data_source_1.AppDataSource.getRepository(DeviceInfo_1.DeviceInfo); // DeviceInfo Repository
    try {
        const { name, model, manufacturer, version, brand, fingerprint, serial_number, device_id, IMEI, latitude, longitude, } = req.body;
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
        // Fetch the entity based on userId and userType, along with its deviceInfos relation
        const entity = yield repo.findOne({
            where: { id: userId },
            relations: ["deviceInfos"],
        });
        if (!entity) {
            return res.status(404).json({
                success: false,
                message: `${userType} with ID ${userId} not found.`,
                data: null,
            });
        }
        // Check if DeviceInfo already exists for this entity
        let existingDeviceInfo = yield deviceRepo.findOne({
            where: { [relationKey]: entity },
        });
        if (existingDeviceInfo) {
            // If device info exists, update it
            existingDeviceInfo = Object.assign(existingDeviceInfo, {
                name,
                model,
                manufacturer,
                version,
                brand,
                fingerprint,
                serial_number,
                device_id,
                IMEI,
                latitude,
                longitude,
                updatedAt: new Date(),
            });
            // Save the updated DeviceInfo
            yield deviceRepo.save(existingDeviceInfo);
            return res.status(200).json({
                success: true,
                message: `Device info updated successfully for ${userType}.`,
                data: existingDeviceInfo,
            });
        }
        // If DeviceInfo does not exist, create a new DeviceInfo
        const newDeviceInfo = deviceRepo.create({
            name,
            model,
            manufacturer,
            version,
            brand,
            fingerprint,
            serial_number,
            device_id,
            IMEI,
            latitude,
            longitude,
            createdAt: new Date(),
            updatedAt: new Date(),
            [relationKey]: entity, // Link to the user entity
        });
        // Save the newly created DeviceInfo
        yield deviceRepo.save(newDeviceInfo);
        return res.status(201).json({
            success: true,
            message: `Device info created and linked to ${userType} successfully.`,
            data: newDeviceInfo,
        });
    }
    catch (error) {
        console.error("Error adding/updating device info:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
            data: null,
        });
    }
});
exports.addOrUpdateDeviceInfoForEntity = addOrUpdateDeviceInfoForEntity;
// ✅ Get Device Info by Entity
const getDeviceInfoByEntityId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceRepo = data_source_1.AppDataSource.getRepository(DeviceInfo_1.DeviceInfo);
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
        const deviceInfo = yield deviceRepo.findOne({
            where: {
                [relationKey]: entity,
            },
        });
        if (!deviceInfo) {
            return res.status(404).json({
                success: false,
                message: `No device info found for ${userType} with ID ${userId}.`,
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Device info retrieved for ${userType}.`,
            data: deviceInfo,
        });
    }
    catch (error) {
        console.error("Error fetching device info:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
            data: null,
        });
    }
});
exports.getDeviceInfoByEntityId = getDeviceInfoByEntityId;
