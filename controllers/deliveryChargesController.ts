// src/controllers/deliveryChargesController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DeliveryCharge } from "../entities/DeliveryCharges";

// Create Delivery Charge
export const createDeliveryCharge = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { area, charge } = req.body;

  if (!area || charge === undefined) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Area and charge are required",
        data: {},
      });
  }

  try {
    const deliveryCharge = new DeliveryCharge();
    deliveryCharge.area = area;
    deliveryCharge.charge = charge;

    // Save the new delivery charge to the database
    await AppDataSource.manager.save(deliveryCharge);
    return res.status(201).json({
      success: true,
      message: "Delivery charge created successfully",
      data: deliveryCharge,
    });
  } catch (error) {
    console.error("Error creating delivery charge:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error creating delivery charge",
        data: {},
      });
  }
};

// Get all Delivery Charges
export const getDeliveryCharges = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deliveryCharges = await AppDataSource.manager.find(DeliveryCharge);
    return res.status(200).json({
      success: true,
      message: "Delivery charges fetched successfully",
      data: deliveryCharges,
    });
  } catch (error) {
    console.error("Error fetching delivery charges:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching delivery charges",
        data: [],
      });
  }
};

// Get Delivery Charge by ID
export const getDeliveryChargeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const deliveryCharge = await AppDataSource.manager.findOne(DeliveryCharge, {
      where: { id: Number(id) },
    });

    if (!deliveryCharge) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Delivery charge not found",
          data: {},
        });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery charge fetched successfully",
      data: deliveryCharge,
    });
  } catch (error) {
    console.error("Error fetching delivery charge by ID:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error fetching delivery charge",
        data: {},
      });
  }
};

// Update Delivery Charge
export const updateDeliveryCharge = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { area, charge } = req.body;

  if (!area || charge === undefined) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Area and charge are required",
        data: {},
      });
  }

  try {
    const deliveryCharge = await AppDataSource.manager.findOne(DeliveryCharge, {
      where: { id: Number(id) },
    });

    if (!deliveryCharge) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Delivery charge not found",
          data: {},
        });
    }

    deliveryCharge.area = area;
    deliveryCharge.charge = charge;

    // Save the updated delivery charge to the database
    await AppDataSource.manager.save(deliveryCharge);
    return res.status(200).json({
      success: true,
      message: "Delivery charge updated successfully",
      data: deliveryCharge,
    });
  } catch (error) {
    console.error("Error updating delivery charge:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error updating delivery charge",
        data: {},
      });
  }
};

// Delete Delivery Charge
export const deleteDeliveryCharge = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const deliveryCharge = await AppDataSource.manager.findOne(DeliveryCharge, {
      where: { id: Number(id) },
    });

    if (!deliveryCharge) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Delivery charge not found",
          data: {},
        });
    }

    // Delete the delivery charge from the database
    await AppDataSource.manager.remove(deliveryCharge);
    return res.status(200).json({
      success: true,
      message: "Delivery charge deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error deleting delivery charge:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error deleting delivery charge",
        data: {},
      });
  }
};
