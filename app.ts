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
import cors from "cors";

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
app.use("/merchant", merchantRouter);
app.use("/deliveries", deliveryRouter);
app.use("/delivery-charges", deliveryChargesRoutes);
app.use("/delivery-men", deliveryManRoutes);
app.use("/pickup-men", pickupManRoutes);
app.use("/thanas", thanaRoutes);
app.use("/withdrawals", withdrawalRoutes);
app.use("/agents", agentRoutes);
app.use("/products", productRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
