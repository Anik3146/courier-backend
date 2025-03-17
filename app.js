"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source"); // Assuming your data source is configured here
const merchantRouter_1 = __importDefault(require("./routes/merchantRouter"));
const deliveryRouter_1 = __importDefault(require("./routes/deliveryRouter"));
const deliveryChargesRouter_1 = __importDefault(require("./routes/deliveryChargesRouter"));
const deliverymanRouter_1 = __importDefault(require("./routes/deliverymanRouter"));
const pickupmanRouter_1 = __importDefault(require("./routes/pickupmanRouter"));
const thanaRouter_1 = __importDefault(require("./routes/thanaRouter"));
const withdrawlRouter_1 = __importDefault(require("./routes/withdrawlRouter"));
const agentRouter_1 = __importDefault(require("./routes/agentRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Initialize the data source
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Connected to MySQL");
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
});
// Use the routes
app.use("/merchant", merchantRouter_1.default);
app.use("/deliveries", deliveryRouter_1.default);
app.use("/delivery-charges", deliveryChargesRouter_1.default);
app.use("/delivery-men", deliverymanRouter_1.default);
app.use("/pickup-men", pickupmanRouter_1.default);
app.use("/thanas", thanaRouter_1.default);
app.use("/withdrawals", withdrawlRouter_1.default);
app.use("/agents", agentRouter_1.default);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
