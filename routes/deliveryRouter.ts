// src/routes/deliveryRouter.ts
import { Router } from "express";
import { createDelivery } from "../controllers/deliveryController";

const router = Router();

router.post("/", createDelivery);

export default router;
