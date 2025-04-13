import { AppDataSource } from "../data-source";
import { ActivityLog } from "../entities/ActivityLog";
import { Agent } from "../entities/Agent";
import { Operator } from "../entities/Operator";
import { Merchant } from "../entities/Merchant";
import { PickupMan } from "../entities/PickupMan";
import { DeliveryMan } from "../entities/DeliveryMan";
import { Request, Response } from "express";
import { Repository } from "typeorm";

// Union type for all user entities
type UserEntity = Agent | Operator | Merchant | PickupMan | DeliveryMan;

// Utility: Get repo + relation key
const getEntityRepoAndRelation = (
  userType: string
): { repo: Repository<UserEntity>; relationKey: keyof ActivityLog } => {
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

// ✅ Create a new Activity Log for an entity
export const addActivityLogForEntity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const activityRepo = AppDataSource.getRepository(ActivityLog);

  try {
    const {
      activity,
      activity_time,
      newAppuserId,
      email,
      phone_no,
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

    const entity = await repo.findOne({ where: { id: userId } });

    if (!entity) {
      return res.status(404).json({
        success: false,
        message: `${userType} with ID ${userId} not found.`,
        data: null,
      });
    }

    // Create and link the activity log
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
      createdAt: new Date(),
    });

    await activityRepo.save(newActivity);

    return res.status(201).json({
      success: true,
      message: `Activity log added for ${userType} successfully.`,
      data: newActivity,
    });
  } catch (error: any) {
    console.error("Error adding activity log:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};

// ✅ Get all activity logs for an entity
export const getActivityLogsByEntityId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const activityRepo = AppDataSource.getRepository(ActivityLog);

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
        message: `${userType} not found.`,
        data: null,
      });
    }

    const logs = await activityRepo.find({
      where: { [relationKey]: entity },
      order: { createdAt: "DESC" },
    });

    return res.status(200).json({
      success: true,
      message: `Activity logs retrieved for ${userType} with ID ${userId}.`,
      data: logs,
    });
  } catch (error: any) {
    console.error("Error fetching activity logs:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};
