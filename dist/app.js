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
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const pricingPlanRouter_1 = __importDefault(require("./routes/pricingPlanRouter"));
const storeRouter_1 = __importDefault(require("./routes/storeRouter"));
const districtRouter_1 = __importDefault(require("./routes/districtRouter"));
const zoneRouter_1 = __importDefault(require("./routes/zoneRouter"));
const areaRouter_1 = __importDefault(require("./routes/areaRouter"));
const invoiceRouter_1 = __importDefault(require("./routes/invoiceRouter"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
const promoRouter_1 = __importDefault(require("./routes/promoRouter"));
const operatorRouter_1 = __importDefault(require("./routes/operatorRouter"));
const activityLogRouter_1 = __importDefault(require("./routes/activityLogRouter"));
const appInfoRouter_1 = __importDefault(require("./routes/appInfoRouter"));
const deviceInfoRouter_1 = __importDefault(require("./routes/deviceInfoRouter"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
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
app.use("/api/merchant", merchantRouter_1.default);
app.use("/api/deliveries", deliveryRouter_1.default);
app.use("/api/delivery-charges", deliveryChargesRouter_1.default);
app.use("/api/delivery-men", deliverymanRouter_1.default);
app.use("/api/pickup-men", pickupmanRouter_1.default);
app.use("/api/thanas", thanaRouter_1.default);
app.use("/api/withdrawals", withdrawlRouter_1.default);
app.use("/api/agents", agentRouter_1.default);
app.use("/api/products", productRouter_1.default);
app.use("/api/pricing-plan", pricingPlanRouter_1.default);
app.use("/api/stores", storeRouter_1.default);
app.use("/api/districts", districtRouter_1.default);
app.use("/api/zones", zoneRouter_1.default);
app.use("/api/areas", areaRouter_1.default);
app.use("/api/invoices", invoiceRouter_1.default);
app.use("/api/messages", messageRouter_1.default);
app.use("/api/promos", promoRouter_1.default);
app.use("/api/operators", operatorRouter_1.default);
app.use("/api/activity-log", activityLogRouter_1.default);
app.use("/api/app-info", appInfoRouter_1.default);
app.use("/api/device-info", deviceInfoRouter_1.default);
// Serve static files (e.g., images) from the 'uploads' directory
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use("/", (req, res) => {
    return res
        .status(200)
        .json({ message: "This is the Courier BD application backend" });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
