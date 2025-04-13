// src/routes/merchantRouter.ts
import { Router } from "express";
import {
  assignPromoToMerchant,
  getMerchantById,
  registerMerchant,
  signInMerchant,
  updateMerchantById,
} from "../controllers/merchantController";
import { authenticateToken } from "../middleware/Authentication";

const router = Router();

// Register Merchant
router.post("/register", registerMerchant);

// Sign In Merchant
router.post("/signin", signInMerchant);

// Get Merchant by ID (new route)
router.get("/:id", authenticateToken, getMerchantById);

//update merchant by id
router.put("/:id", authenticateToken, updateMerchantById);

// Assign a promo to a merchant
router.post("/:merchantId/assign-promo/:promoId", async (req, res) => {
  try {
    await assignPromoToMerchant(req, res);
  } catch (error) {
    console.error("Error assigning promo to merchant:", error);
    res.status(500).json({
      success: false,
      message: "Failed to assign promo to merchant.",
      data: null,
    });
  }
});

export default router;
