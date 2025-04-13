"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// Assign a promo to a merchant
router.post("/:merchantId/assign-promo/:promoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, merchantController_1.assignPromoToMerchant)(req, res);
    }
    catch (error) {
        console.error("Error assigning promo to merchant:", error);
        res.status(500).json({
            success: false,
            message: "Failed to assign promo to merchant.",
            data: null,
        });
    }
}));
exports.default = router;
