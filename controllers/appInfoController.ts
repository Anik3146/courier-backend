import { AppDataSource } from "../data-source";
import { AppInfo } from "../entities/AppInfo";
import { Agent } from "../entities/Agent";
import { Operator } from "../entities/Operator";
import { Merchant } from "../entities/Merchant";
import { PickupMan } from "../entities/PickupMan";
import { DeliveryMan } from "../entities/DeliveryMan";
import { Request, Response } from "express";
import { Repository } from "typeorm";

// ✅ Union type for all user entities
type UserEntity = Agent | Operator | Merchant | PickupMan | DeliveryMan;

// ✅ Utility function to return proper repository and relation key
const getEntityRepoAndRelation = (
  userType: string
): { repo: Repository<UserEntity>; relationKey: string } => {
  switch (userType.toLowerCase()) {
    case "agent":
      return {
        repo: AppDataSource.getRepository(Agent) as Repository<UserEntity>,
        relationKey: "agent",
      };
    case "operator":
      return {
        repo: AppDataSource.getRepository(Operator) as Repository<UserEntity>,
        relationKey: "operator",
      };
    case "merchant":
      return {
        repo: AppDataSource.getRepository(Merchant) as Repository<UserEntity>,
        relationKey: "merchant",
      };
    case "pickupman":
      return {
        repo: AppDataSource.getRepository(PickupMan) as Repository<UserEntity>,
        relationKey: "pickupMan",
      };
    case "deliveryman":
      return {
        repo: AppDataSource.getRepository(
          DeliveryMan
        ) as Repository<UserEntity>,
        relationKey: "deliveryMan",
      };
    default:
      throw new Error("Invalid user type");
  }
};

// ✅ Main controller function
export const addOrUpdateAppInfoForEntity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const appInfoRepo = AppDataSource.getRepository(AppInfo); // Repo for AppInfo

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

    // Get repo and relation key based on userType
    const { repo, relationKey } = getEntityRepoAndRelation(userType);

    // Fetch entity with app_info relation
    const entity = await repo.findOne({
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
    let appInfo: AppInfo | null = (entity as any).app_info || null;

    if (appInfo) {
      // If appInfo exists, update it
      appInfo.title = title ?? appInfo.title;
      appInfo.subtitle = subtitle ?? appInfo.subtitle;
      appInfo.description = description ?? appInfo.description;
      appInfo.shareLink = shareLink ?? appInfo.shareLink;
      appInfo.privacyPolicy = privacyPolicy ?? appInfo.privacyPolicy;
      appInfo.latest_app_version =
        latest_app_version ?? appInfo.latest_app_version;
      appInfo.latest_ios_version =
        latest_ios_version ?? appInfo.latest_ios_version;
      appInfo.is_update_available =
        is_update_available ?? appInfo.is_update_available;
      appInfo.update_note = update_note ?? appInfo.update_note;
      appInfo.google_play_update_link =
        google_play_update_link ?? appInfo.google_play_update_link;
      appInfo.app_store_update_link =
        app_store_update_link ?? appInfo.app_store_update_link;
      appInfo.updatedAt = new Date();

      // Save the updated appInfo
      await appInfoRepo.save(appInfo);

      return res.status(200).json({
        success: true,
        message: `App info updated successfully for ${userType}.`,
        data: appInfo,
      });
    } else {
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
      await appInfoRepo.save(appInfo);

      // Link new appInfo to the user entity
      (entity as any).app_info = appInfo;

      // Save the entity with the newly linked app info
      await repo.save(entity);

      return res.status(201).json({
        success: true,
        message: `App info added and linked to ${userType} successfully.`,
        data: appInfo,
      });
    }
  } catch (error: any) {
    console.error("Error in adding/updating app information:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};

//get by id
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

    // Get the correct repository
    const { repo } = getEntityRepoAndRelation(userType);

    // Fetch the entity including app_info relation
    const entity = await repo.findOne({
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

    const appInfo = (entity as any).app_info;

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
  } catch (error: any) {
    console.error("Error fetching app info by entity ID:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};
