import { Router } from "express";
import {
  createPromo,
  getAllPromos,
  getPromoById,
  updatePromo,
  deletePromo,
} from "../controllers/promoController";

const router = Router();

// Create Promo
router.post("/", async (req, res) => {
  try {
    await createPromo(req, res);
  } catch (error) {
    console.error("Error creating promo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create promo.",
      data: null,
    });
  }
});

// Get All Promos
router.get("/", async (req, res) => {
  try {
    await getAllPromos(req, res);
  } catch (error) {
    console.error("Error fetching promos:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch promos.",
      data: null,
    });
  }
});

// Get Promo by ID
router.get("/:id", async (req, res) => {
  try {
    await getPromoById(req, res);
  } catch (error) {
    console.error("Error fetching promo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch promo.",
      data: null,
    });
  }
});

// Update Promo
router.put("/:id", async (req, res) => {
  try {
    await updatePromo(req, res);
  } catch (error) {
    console.error("Error updating promo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update promo.",
      data: null,
    });
  }
});

// Delete Promo
router.delete("/:id", async (req, res) => {
  try {
    await deletePromo(req, res);
  } catch (error) {
    console.error("Error deleting promo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete promo.",
      data: null,
    });
  }
});

export default router;
