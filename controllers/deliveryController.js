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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDelivery = void 0;
const data_source_1 = require("../data-source"); // DB connection
const Merchant_1 = require("../entities/Merchant");
const Delivery_1 = require("../entities/Delivery");
const createDelivery = (req, res) => {
    // The outer function is synchronous
    const createNewDelivery = () => __awaiter(void 0, void 0, void 0, function* () {
        const { store_name, product_type, merchant_id, recipient_name, recipient_phone, recipient_secondary_phone, address, area, instructions, delivery_type, total_weight, quantity, amount_to_collect, price, division, zilla, thana, delivery_charge, } = req.body;
        // Basic validation
        if (!store_name || !product_type || !recipient_name || !recipient_phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        try {
            // Find the merchant in the database
            const merchant = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { id: merchant_id },
            });
            if (!merchant) {
                return res.status(404).json({ message: "Merchant not found" });
            }
            // Create a new delivery
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
            // Save the new delivery to the database
            yield data_source_1.AppDataSource.manager.save(delivery);
            return res.status(201).json(delivery);
        }
        catch (error) {
            console.error("Error saving delivery:", error);
            return res.status(500).json({ message: "Error saving delivery" });
        }
    });
    // Call the inner async function
    createNewDelivery().catch((err) => {
        console.error("Unexpected error:", err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    });
};
exports.createDelivery = createDelivery;
