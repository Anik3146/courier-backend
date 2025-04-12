// src/routes/merchantRouter.ts
import { Router } from "express";
import {
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

export default router;
