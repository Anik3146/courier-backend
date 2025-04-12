"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./entities/Merchant");
const Delivery_1 = require("./entities/Delivery");
const Agent_1 = require("./entities/Agent");
const PickupMan_1 = require("./entities/PickupMan");
const DeliveryMan_1 = require("./entities/DeliveryMan");
const Thana_1 = require("./entities/Thana");
const Withdrawl_1 = require("./entities/Withdrawl");
const DeliveryCharges_1 = require("./entities/DeliveryCharges");
const Products_1 = require("./entities/Products");
const PricingPlan_1 = require("./entities/PricingPlan");
const Store_1 = require("./entities/Store");
const District_1 = require("./entities/District");
const Zone_1 = require("./entities/Zone");
const Area_1 = require("./entities/Area");
const Invoice_1 = require("./entities/Invoice");
// Add other entities as required
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        Merchant_1.Merchant,
        Delivery_1.Delivery,
        Agent_1.Agent,
        PickupMan_1.PickupMan,
        DeliveryMan_1.DeliveryMan,
        Thana_1.Thana,
        Withdrawl_1.Withdrawal,
        DeliveryCharges_1.DeliveryCharge,
        Products_1.Product,
        PricingPlan_1.PricingPlan,
        Store_1.Store,
        District_1.District,
        Zone_1.Zone,
        Area_1.Area,
        Invoice_1.Invoice,
    ], // Include all entities
    synchronize: true,
    logging: true,
});
