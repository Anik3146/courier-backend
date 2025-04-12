import { Router } from "express";
import {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
} from "../controllers/storeController";

const router = Router();

// Create Store
router.post("/", async (req, res) => {
  try {
    await createStore(req, res);
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create store.",
      data: null,
    });
  }
});

// Get All Stores
router.get("/", async (req, res) => {
  try {
    await getAllStores(req, res);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stores.",
      data: null,
    });
  }
});

// Get Store by ID
router.get("/:id", async (req, res) => {
  try {
    await getStoreById(req, res);
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch store.",
      data: null,
    });
  }
});

// Update Store
router.put("/:id", async (req, res) => {
  try {
    await updateStore(req, res);
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update store.",
      data: null,
    });
  }
});

// Delete Store
router.delete("/:id", async (req, res) => {
  try {
    await deleteStore(req, res);
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete store.",
      data: null,
    });
  }
});

export default router;
