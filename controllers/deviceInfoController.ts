import { AppDataSource } from "../data-source";
import { DeviceInfo } from "../entities/DeviceInfo";
import { Agent } from "../entities/Agent";
import { Operator } from "../entities/Operator";
import { Merchant } from "../entities/Merchant";
import { PickupMan } from "../entities/PickupMan";
import { DeliveryMan } from "../entities/DeliveryMan";
import { Request, Response } from "express";
import { Repository } from "typeorm";

type UserEntity = Agent | Operator | Merchant | PickupMan | DeliveryMan;

const getEntityRepoAndRelation = (
  userType: string
): { repo: Repository<UserEntity>; relationKey: keyof DeviceInfo } => {
  switch (userType.toLowerCase()) {
    case "agent":
      return {
        repo: AppDataSource.getRepository(Agent),
        relationKey: "agent",
      };
    case "operator":
      return {
        repo: AppDataSource.getRepository(Operator),
        relationKey: "operator",
      };
    case "merchant":
      return {
        repo: AppDataSource.getRepository(Merchant),
        relationKey: "merchant",
      };
    case "pickupman":
      return {
        repo: AppDataSource.getRepository(PickupMan),
        relationKey: "pickupMan",
      };
    case "deliveryman":
      return {
        repo: AppDataSource.getRepository(DeliveryMan),
        relationKey: "deliveryMan",
      };
    default:
      throw new Error("Invalid user type");
  }
};

// ✅ Add or Update Device Info for Entity
export const addOrUpdateDeviceInfoForEntity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const deviceRepo = AppDataSource.getRepository(DeviceInfo);

  try {
    const {
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
    } = req.body;

    const userId = Number(req.params.userId);
    const userType = req.query.userType as string;

    if (!userId || !userType) {
      return res.status(400).json({
        success: false,
        message: "userId and userType are required.",
        data: null,
      });
    }

    const { repo, relationKey } = getEntityRepoAndRelation(userType);

    const entity = await repo.findOne({
      where: { id: userId },
    });

    if (!entity) {
      return res.status(404).json({
        success: false,
        message: `${userType} with ID ${userId} not found.`,
        data: null,
      });
    }

    // Check if DeviceInfo already exists for this user
    const existingDeviceInfo = await deviceRepo.findOne({
      where: {
        [relationKey]: entity,
      },
    });

    if (existingDeviceInfo) {
      // Update existing
      Object.assign(existingDeviceInfo, {
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

      await deviceRepo.save(existingDeviceInfo);

      return res.status(200).json({
        success: true,
        message: `Device info updated successfully for ${userType}.`,
        data: existingDeviceInfo,
      });
    }

    // Otherwise, create new
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
      [relationKey]: entity,
    });

    await deviceRepo.save(newDeviceInfo);

    return res.status(201).json({
      success: true,
      message: `Device info created and linked to ${userType} successfully.`,
      data: newDeviceInfo,
    });
  } catch (error: any) {
    console.error("Error adding/updating device info:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};

// ✅ Get Device Info by Entity ID
export const getDeviceInfoByEntityId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const deviceRepo = AppDataSource.getRepository(DeviceInfo);

  try {
    const userId = Number(req.params.userId);
    const userType = req.query.userType as string;

    if (!userId || !userType) {
      return res.status(400).json({
        success: false,
        message: "userId and userType are required.",
        data: null,
      });
    }

    const { repo, relationKey } = getEntityRepoAndRelation(userType);
    const entity = await repo.findOne({ where: { id: userId } });

    if (!entity) {
      return res.status(404).json({
        success: false,
        message: `${userType} with ID ${userId} not found.`,
        data: null,
      });
    }

    const deviceInfo = await deviceRepo.findOne({
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
  } catch (error: any) {
    console.error("Error fetching device info:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};
