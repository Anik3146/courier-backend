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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./entities/Merchant");
const Delivery_1 = require("./entities/Delivery");
const Agent_1 = require("./entities/Agent");
const PickupMan_1 = require("./entities/PickupMan");
const DeliveryMan_1 = require("./entities/DeliveryMan");
const Thana_1 = require("./entities/Thana");
const Withdrawl_1 = require("./entities/Withdrawl");
const DeliveryCharges_1 = require("./entities/DeliveryCharges");
// Define the data source
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "courier_db",
    entities: [
        Merchant_1.Merchant,
        Delivery_1.Delivery,
        Agent_1.Agent,
        PickupMan_1.PickupMan,
        DeliveryMan_1.DeliveryMan,
        Thana_1.Thana,
        Withdrawl_1.Withdrawal,
        DeliveryCharges_1.DeliveryCharge,
    ],
    synchronize: true,
    logging: true,
});
// Create the Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Establish connection
AppDataSource.initialize()
    .then(() => {
    console.log("Connected to MySQL");
    // Example API: Register Merchant
    app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { company_name, owner_name, mobile_number, email, password } = req.body;
        // Basic validation
        if (!company_name ||
            !owner_name ||
            !mobile_number ||
            !email ||
            !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const merchant = new Merchant_1.Merchant();
        merchant.company_name = company_name;
        merchant.owner_name = owner_name;
        merchant.mobile_number = mobile_number;
        merchant.email = email;
        merchant.password = password;
        try {
            yield AppDataSource.manager.save(merchant);
            res.status(201).json(merchant);
        }
        catch (error) {
            console.error("Error saving merchant:", error);
            res.status(500).json({ message: "Error saving merchant" });
        }
    }));
    // Example API: Create New Delivery
    app.post("/deliveries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { store_name, product_type, merchant_id, recipient_name, recipient_phone, recipient_secondary_phone, address, area, instructions, delivery_type, total_weight, quantity, amount_to_collect, price, division, zilla, thana, delivery_charge, } = req.body;
        // Basic validation
        if (!store_name || !product_type || !recipient_name || !recipient_phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const merchant = yield AppDataSource.manager.findOneBy(Merchant_1.Merchant, {
            id: merchant_id,
        });
        if (!merchant) {
            return res.status(404).json({ message: "Merchant not found" });
        }
        const delivery = new Delivery_1.Delivery();
        delivery.store_name = store_name;
        delivery.product_type = product_type;
        delivery.merchant = merchant;
        delivery.recipient_name = recipient_name;
        delivery.recipient_phone = recipient_phone;
        delivery.recipient_secondary_phone = recipient_secondary_phone;
        delivery.address = address;
        delivery.area = area;
        delivery.instructions = instructions;
        delivery.delivery_type = delivery_type;
        delivery.total_weight = total_weight;
        delivery.quantity = quantity;
        delivery.amount_to_collect = amount_to_collect;
        delivery.price = price;
        delivery.division = division;
        delivery.zilla = zilla;
        delivery.thana = thana;
        delivery.delivery_charge = delivery_charge;
        try {
            yield AppDataSource.manager.save(delivery);
            res.status(201).json(delivery);
        }
        catch (error) {
            console.error("Error saving delivery:", error);
            res.status(500).json({ message: "Error saving delivery" });
        }
    }));
    // Start the Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection error:", error);
});
