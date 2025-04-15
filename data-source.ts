// src/data-source.ts
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Merchant } from "./entities/Merchant";
import { Delivery } from "./entities/Delivery";
import { Agent } from "./entities/Agent";
import { PickupMan } from "./entities/PickupMan";
import { DeliveryMan } from "./entities/DeliveryMan";
import { Thana } from "./entities/Thana";
import { Withdrawal } from "./entities/Withdrawl";
import { DeliveryCharge } from "./entities/DeliveryCharges";
import { Product } from "./entities/Products";
import { PricingPlan } from "./entities/PricingPlan";
import { Store } from "./entities/Store";
import { District } from "./entities/District";
import { Zone } from "./entities/Zone";
import { Area } from "./entities/Area";
import { Invoice } from "./entities/Invoice";
import { Message } from "./entities/Message";
import { Promo } from "./entities/Promo";
import { Operator } from "./entities/Operator";
import { ActivityLog } from "./entities/ActivityLog";
import { AppInfo } from "./entities/AppInfo";
import { DeviceInfo } from "./entities/DeviceInfo";
import { Report } from "./entities/Report";
// Add other entities as required
dotenv.config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Merchant,
    Delivery,
    Agent,
    PickupMan,
    DeliveryMan,
    Thana,
    Withdrawal,
    DeliveryCharge,
    Product,
    PricingPlan,
    Store,
    District,
    Zone,
    Area,
    Invoice,
    Message,
    Promo,
    Operator,
    ActivityLog,
    AppInfo,
    DeviceInfo,
    Report,
  ], // Include all entities
  synchronize: true,
  logging: true,
});
