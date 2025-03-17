// src/app.ts
import express from "express";
import { AppDataSource } from "./data-source"; // Assuming your data source is configured here
import merchantRouter from "./routes/merchantRouter";
import deliveryRouter from "./routes/deliveryRouter";

const app = express();
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
