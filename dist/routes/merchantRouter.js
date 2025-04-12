"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/merchantRouter.ts
const express_1 = require("express");
const merchantController_1 = require("../controllers/merchantController");
const Authentication_1 = require("../middleware/Authentication");
const router = (0, express_1.Router)();
// Register Merchant
router.post("/register", merchantController_1.registerMerchant);
// Sign In Merchant
router.post("/signin", merchantController_1.signInMerchant);
// Get Merchant by ID (new route)
router.get("/:id", Authentication_1.authenticateToken, merchantController_1.getMerchantById);
//update merchant by id
router.put("/:id", Authentication_1.authenticateToken, merchantController_1.updateMerchantById);
exports.default = router;
