// src/app.ts
import express from "express";
import { AppDataSource } from "./data-source"; // Assuming your data source is configured here
import merchantRouter from "./routes/merchantRouter";
import deliveryRouter from "./routes/deliveryRouter";
import deliveryChargesRoutes from "./routes/deliveryChargesRouter";
import deliveryManRoutes from "./routes/deliverymanRouter";
import pickupManRoutes from "./routes/pickupmanRouter";
import thanaRoutes from "./routes/thanaRouter";
import withdrawalRoutes from "./routes/withdrawlRouter";
import agentRoutes from "./routes/agentRouter";
import productRouter from "./routes/productRouter";
import pricingPlanRoutes from "./routes/pricingPlanRouter";
import storeRoutes from "./routes/storeRouter";
import districtRoutes from "./routes/districtRouter";
import zoneRoutes from "./routes/zoneRouter";
import areaRoutes from "./routes/areaRouter";
import invoiceRoutes from "./routes/invoiceRouter";
import messageRoutes from "./routes/messageRouter";
import promoRoutes from "./routes/promoRouter";
import operatorRoutes from "./routes/operatorRouter";
import activityLogRoutes from "./routes/activityLogRouter";
import appInfoRoutes from "./routes/appInfoRouter";
import deviceInfoRoutes from "./routes/deviceInfoRouter";
import reportRoutes from "./routes/reportRouter";

import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Use the routes

app.use("/api/merchant", merchantRouter);
app.use("/api/deliveries", deliveryRouter);
app.use("/api/delivery-charges", deliveryChargesRoutes);
app.use("/api/delivery-men", deliveryManRoutes);
app.use("/api/pickup-men", pickupManRoutes);
app.use("/api/thanas", thanaRoutes);
app.use("/api/withdrawals", withdrawalRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/products", productRouter);
app.use("/api/pricing-plan", pricingPlanRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/areas", areaRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/activity-log", activityLogRoutes);
app.use("/api/app-info", appInfoRoutes);
app.use("/api/device-info", deviceInfoRoutes);
app.use("/api/report-issue", reportRoutes);

// Serve static files (e.g., images) from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", (req: any, res: any) => {
  return res
    .status(200)
    .json({ message: "This is the Courier BD application backend" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
