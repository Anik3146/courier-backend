import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Promo } from "../entities/Promo";

const promoRepo = AppDataSource.getRepository(Promo);

// Helper function for success response
const successResponse = (message: string, data: any) => ({
  success: true,
  message,
  data,
});

// Helper function for error response
const errorResponse = (message: string) => ({
  success: false,
  message,
});

// Get all promos
export const getAllPromos = async (req: Request, res: Response) => {
  try {
    const promos = await promoRepo.find();
    res.json(successResponse("Promos retrieved successfully", promos));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to fetch promos"));
  }
};

// Get promo by ID
export const getPromoById = async (req: Request, res: Response) => {
  try {
    const promo = await promoRepo.findOneBy({ id: +req.params.id });
    if (!promo) {
      return res.status(404).json(errorResponse("Promo not found"));
    }
    res.json(successResponse("Promo retrieved successfully", promo));
  } catch (error) {
    res.status(500).json(errorResponse("Error retrieving promo"));
  }
};

// Create promo
export const createPromo = async (req: Request, res: Response) => {
  try {
    const promo = promoRepo.create(req.body);
    const saved = await promoRepo.save(promo);
    res.status(201).json(successResponse("Promo created successfully", saved));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to create promo"));
  }
};

// Update promo
export const updatePromo = async (req: Request, res: Response) => {
  try {
    const promo = await promoRepo.findOneBy({ id: +req.params.id });
    if (!promo) {
      return res.status(404).json(errorResponse("Promo not found"));
    }

    promoRepo.merge(promo, req.body);
    const updated = await promoRepo.save(promo);
    res.json(successResponse("Promo updated successfully", updated));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to update promo"));
  }
};

// Delete promo
export const deletePromo = async (req: Request, res: Response) => {
  try {
    const result = await promoRepo.delete(+req.params.id);
    if (result.affected === 0) {
      return res.status(404).json(errorResponse("Promo not found"));
    }
    res.json(
      successResponse("Promo deleted successfully", {
        message: "Promo deleted",
      })
    );
  } catch (error) {
    res.status(500).json(errorResponse("Failed to delete promo"));
  }
};
