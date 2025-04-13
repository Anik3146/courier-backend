import { AppDataSource } from "../data-source";
import { AppInfo } from "../entities/AppInfo";
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
): {
  repo: Repository<UserEntity>;
  relationKey: keyof AppInfo;
} => {
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

// ✅ Add or Update App Info for User
export const addOrUpdateAppInfoForEntity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const appInfoRepo = AppDataSource.getRepository(AppInfo);

  try {
    const {
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

    // Check if an app info already exists for this user
    const existingAppInfo = await appInfoRepo.findOne({
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

      await appInfoRepo.save(existingAppInfo);

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

    await appInfoRepo.save(newAppInfo);

    return res.status(201).json({
      success: true,
      message: `App info created and linked to ${userType} successfully.`,
      data: newAppInfo,
    });
  } catch (error: any) {
    console.error("Error in adding/updating app information:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};

// ✅ Get App Info by User ID
export const getAppInfoByEntityId = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

    const appInfo = await AppDataSource.getRepository(AppInfo).findOne({
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
  } catch (error: any) {
    console.error("Error fetching app info by entity ID:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};
