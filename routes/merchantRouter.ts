// src/routes/merchantRouter.ts
import { Router } from "express";
import {
  registerMerchant,
  signInMerchant,
} from "../controllers/merchantController";

const router = Router();

// Register Merchant
router.post("/register", registerMerchant);

// Sign In Merchant
router.post("/signin", signInMerchant);

export default router;
