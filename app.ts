import express from "express";
import { DataSource } from "typeorm";
import { Merchant } from "./entities/Merchant";
import { Delivery } from "./entities/Delivery";
import { Agent } from "./entities/Agent";
import { PickupMan } from "./entities/PickupMan";
import { DeliveryMan } from "./entities/DeliveryMan";
import { Thana } from "./entities/Thana";
import { Withdrawal } from "./entities/Withdrawl";
import { DeliveryCharge } from "./entities/DeliveryCharges";

// Define the data source
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "courier_db",
  entities: [
    Merchant,
    Delivery,
    Agent,
    PickupMan,
    DeliveryMan,
    Thana,
    Withdrawal,
    DeliveryCharge,
  ],
  synchronize: true,
  logging: true,
});

// Create the Express app
const app = express();
app.use(express.json());

// Establish connection
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL");

    // Example API: Register Merchant
    app.post("/register", async (req: any, res: any) => {
      const { company_name, owner_name, mobile_number, email, password } =
        req.body;

      // Basic validation
      if (
        !company_name ||
        !owner_name ||
        !mobile_number ||
        !email ||
        !password
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const merchant = new Merchant();
      merchant.company_name = company_name;
      merchant.owner_name = owner_name;
      merchant.mobile_number = mobile_number;
      merchant.email = email;
      merchant.password = password;

      try {
        await AppDataSource.manager.save(merchant);
        res.status(201).json(merchant);
      } catch (error) {
        console.error("Error saving merchant:", error);
        res.status(500).json({ message: "Error saving merchant" });
      }
    });

    // Example API: Create New Delivery
    app.post("/deliveries", async (req: any, res: any) => {
      const {
        store_name,
        product_type,
        merchant_id,
        recipient_name,
        recipient_phone,
        recipient_secondary_phone,
        address,
        area,
        instructions,
        delivery_type,
        total_weight,
        quantity,
        amount_to_collect,
        price,
        division,
        zilla,
        thana,
        delivery_charge,
      } = req.body;

      // Basic validation
      if (!store_name || !product_type || !recipient_name || !recipient_phone) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const merchant = await AppDataSource.manager.findOneBy(Merchant, {
        id: merchant_id,
      });

      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }

      const delivery = new Delivery();
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
        await AppDataSource.manager.save(delivery);
        res.status(201).json(delivery);
      } catch (error) {
        console.error("Error saving delivery:", error);
        res.status(500).json({ message: "Error saving delivery" });
      }
    });

    // Start the Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
