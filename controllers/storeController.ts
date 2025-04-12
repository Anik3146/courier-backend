import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Store } from "../entities/Store";

const repo = AppDataSource.getRepository(Store);

// Get All Stores
export const getAllStores = async (req: Request, res: Response) => {
  const stores = await repo.find();
  res.json({
    success: true,
    message: "Stores fetched successfully.",
    data: stores,
  });
};

// Get Store by ID
export const getStoreById = async (req: Request, res: Response) => {
  const store = await repo.findOneBy({ id: Number(req.params.id) });
  if (!store) {
    return res.status(404).json({
      success: false,
      message: "Store not found.",
      data: null,
    });
  }

  res.json({
    success: true,
    message: "Store fetched successfully.",
    data: store,
  });
};

// Create Store
export const createStore = async (req: Request, res: Response) => {
  const store = repo.create(req.body);
  const result = await repo.save(store);
  res.status(201).json({
    success: true,
    message: "Store created successfully.",
    data: result,
  });
};

// Update Store
export const updateStore = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const store = await repo.findOneBy({ id });

  if (!store) {
    return res.status(404).json({
      success: false,
      message: "Store not found.",
      data: null,
    });
  }

  repo.merge(store, req.body);
  const result = await repo.save(store);
  res.json({
    success: true,
    message: "Store updated successfully.",
    data: result,
  });
};

// Delete Store
export const deleteStore = async (req: Request, res: Response) => {
  const result = await repo.delete(req.params.id);
  const deleted = result.affected ?? 0;

  if (deleted === 0) {
    return res.status(404).json({
      success: false,
      message: "Store not found or already deleted.",
      data: null,
    });
  }

  res.json({
    success: true,
    message: "Store deleted successfully.",
    data: { deleted },
  });
};
