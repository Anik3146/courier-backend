import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PricingPlan } from "../entities/PricingPlan";

const repo = AppDataSource.getRepository(PricingPlan);

// Get All Plans
export const getAllPlans = async (req: Request, res: Response) => {
  const plans = await repo.find();
  res.json({
    success: true,
    message: "Pricing plans fetched successfully.",
    data: plans,
  });
};

// Get Plan by ID
export const getPlanById = async (req: Request, res: Response) => {
  const plan = await repo.findOneBy({ id: Number(req.params.id) });
  if (!plan) {
    return res.status(404).json({
      success: false,
      message: "Pricing plan not found.",
      data: null,
    });
  }

  res.json({
    success: true,
    message: "Pricing plan fetched successfully.",
    data: plan,
  });
};

// Create Plan
export const createPlan = async (req: Request, res: Response) => {
  const plan = repo.create(req.body);
  const result = await repo.save(plan);
  res.status(201).json({
    success: true,
    message: "Pricing plan created successfully.",
    data: result,
  });
};

// Update Plan
export const updatePlan = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const plan = await repo.findOneBy({ id });

  if (!plan) {
    return res.status(404).json({
      success: false,
      message: "Pricing plan not found.",
      data: null,
    });
  }

  repo.merge(plan, req.body);
  const result = await repo.save(plan);
  res.json({
    success: true,
    message: "Pricing plan updated successfully.",
    data: result,
  });
};

// Delete Plan
export const deletePlan = async (req: Request, res: Response) => {
  const result = await repo.delete(req.params.id);
  const deleted = result.affected ?? 0;

  if (deleted === 0) {
    return res.status(404).json({
      success: false,
      message: "Pricing plan not found or already deleted.",
      data: null,
    });
  }

  res.json({
    success: true,
    message: "Pricing plan deleted successfully.",
    data: { deleted },
  });
};
