// src/routes/merchantRouter.ts
import { Router } from "express";
import {
  getMerchantById,
  registerMerchant,
  signInMerchant,
} from "../controllers/merchantController";
import { authenticateToken } from "../middleware/Authentication";

const router = Router();

// Register Merchant
router.post("/register", registerMerchant);

// Sign In Merchant
router.post("/signin", signInMerchant);

// Get Merchant by ID (new route)
router.get("/:id", authenticateToken, getMerchantById);

export default router;
