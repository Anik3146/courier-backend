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
    return res.status(400).json({
      success: false,
      message: "Thana name is required",
      data: {},
    });
  }

  try {
    const thana = new Thana();
    thana.thana_name = thana_name;

    await AppDataSource.manager.save(thana);
    return res.status(201).json({
      success: true,
      message: "Thana created successfully",
      data: thana,
    });
  } catch (error) {
    console.error("Error creating thana:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating thana",
      data: {},
    });
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
    return res.status(200).json({
      success: true,
      message: "Thanas fetched successfully",
      data: thanas,
    });
  } catch (error) {
    console.error("Error fetching thanas:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching thanas",
      data: {},
    });
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
      return res.status(404).json({
        success: false,
        message: "Thana not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thana fetched successfully",
      data: thana,
    });
  } catch (error) {
    console.error("Error fetching thana by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching thana",
      data: {},
    });
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
    return res.status(400).json({
      success: false,
      message: "Thana name is required",
      data: {},
    });
  }

  try {
    const thana = await AppDataSource.manager.findOne(Thana, {
      where: { id: Number(id) },
    });

    if (!thana) {
      return res.status(404).json({
        success: false,
        message: "Thana not found",
        data: {},
      });
    }

    thana.thana_name = thana_name;

    await AppDataSource.manager.save(thana);
    return res.status(200).json({
      success: true,
      message: "Thana updated successfully",
      data: thana,
    });
  } catch (error) {
    console.error("Error updating thana:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating thana",
      data: {},
    });
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
      return res.status(404).json({
        success: false,
        message: "Thana not found",
        data: {},
      });
    }

    await AppDataSource.manager.remove(thana);
    return res.status(200).json({
      success: true,
      message: "Thana deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error deleting thana:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting thana",
      data: {},
    });
  }
};
