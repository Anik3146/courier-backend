// src/controllers/thanaController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Thana } from "../entities/Thana";

// Create Thana
export const createThana = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { thana_name } = req.body;

  if (!thana_name) {
    return res.status(400).json({ message: "Thana name is required" });
  }

  try {
    const thana = new Thana();
    thana.thana_name = thana_name;

    await AppDataSource.manager.save(thana);
    return res
      .status(201)
      .json({ message: "Thana created successfully", thana });
  } catch (error) {
    console.error("Error creating thana:", error);
    return res.status(500).json({ message: "Error creating thana" });
  }
};

// Get all Thanas
export const getThanas = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const thanas = await AppDataSource.manager.find(Thana, {
      relations: ["agents"], // Optional: To load associated agents if needed
    });
    return res.status(200).json(thanas);
  } catch (error) {
    console.error("Error fetching thanas:", error);
    return res.status(500).json({ message: "Error fetching thanas" });
  }
};

// Get Thana by ID
export const getThanaById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: Number(id) },
      relations: ["agents"], // Optional: To load associated agents if needed
    });

    if (!thana) {
      return res.status(404).json({ message: "Thana not found" });
    }

    return res.status(200).json(thana);
  } catch (error) {
    console.error("Error fetching thana by ID:", error);
    return res.status(500).json({ message: "Error fetching thana" });
  }
};

// Update Thana
export const updateThana = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { thana_name } = req.body;

  if (!thana_name) {
    return res.status(400).json({ message: "Thana name is required" });
  }

  try {
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: Number(id) },
    });

    if (!thana) {
      return res.status(404).json({ message: "Thana not found" });
    }

    thana.thana_name = thana_name;

    await AppDataSource.manager.save(thana);
    return res
      .status(200)
      .json({ message: "Thana updated successfully", thana });
  } catch (error) {
    console.error("Error updating thana:", error);
    return res.status(500).json({ message: "Error updating thana" });
  }
};

// Delete Thana
export const deleteThana = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: Number(id) },
    });

    if (!thana) {
      return res.status(404).json({ message: "Thana not found" });
    }

    await AppDataSource.manager.remove(thana);
    return res.status(200).json({ message: "Thana deleted successfully" });
  } catch (error) {
    console.error("Error deleting thana:", error);
    return res.status(500).json({ message: "Error deleting thana" });
  }
};
