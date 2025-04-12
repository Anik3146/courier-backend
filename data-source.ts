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
  ], // Include all entities
  synchronize: true,
  logging: true,
});
