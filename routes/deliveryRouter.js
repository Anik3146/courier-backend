"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/deliveryRouter.ts
const express_1 = require("express");
const deliveryController_1 = require("../controllers/deliveryController");
const router = (0, express_1.Router)();
router.post("/", deliveryController_1.createDelivery);
exports.default = router;
