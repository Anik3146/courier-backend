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
exports.updateDeliveryStatus = exports.createDelivery = void 0;
const data_source_1 = require("../data-source"); // DB connection
const Merchant_1 = require("../entities/Merchant");
const Delivery_1 = require("../entities/Delivery");
const Agent_1 = require("../entities/Agent");
const PickupMan_1 = require("../entities/PickupMan");
const DeliveryMan_1 = require("../entities/DeliveryMan");
const DeliveryCharges_1 = require("../entities/DeliveryCharges");
// Create a new delivery
const createDelivery = (req, res) => {
    // The outer function is synchronous
    const createNewDelivery = () => __awaiter(void 0, void 0, void 0, function* () {
        const { store_name, product_type, merchant_id, recipient_name, recipient_phone, recipient_secondary_phone, address, area, instructions, delivery_type, total_weight, quantity, amount_to_collect, price, division, zilla, thana, } = req.body;
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
            // // Find the Thana from the database by name or ID
            // const thanaEntity = await AppDataSource.manager.findOne(Thana, {
            //   where: { thana_name: thana },
            // });
            // if (!thanaEntity) {
            //   return res.status(404).json({ message: "Thana not found" });
            // }
            // // Check if the area is valid and exists in the Thana
            // if (thanaEntity.thana_name !== area) {
            //   return res.status(400).json({ message: "Area does not match Thana" });
            // }
            // Fetch the delivery charge for the specific Thana and area (if applicable)
            // Fetch the delivery charge for the specific Thana and area (if applicable)
            const deliveryChargeEntity = yield data_source_1.AppDataSource.manager.findOne(DeliveryCharges_1.DeliveryCharge, {
                where: { area: area },
            });
            // Set a default value for delivery charge if not found
            const defaultDeliveryCharge = 100; // Set your default charge value here
            const deliveryCharge = deliveryChargeEntity
                ? deliveryChargeEntity.charge
                : defaultDeliveryCharge;
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
            delivery.delivery_charge = deliveryCharge; // Set the delivery charge (either found or default)
            // Set default status to "Pending"
            delivery.delivery_status = "Pending";
            delivery.pickup_status = "Pending";
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
// Update Delivery Status (Pickup & Delivery)
const updateDeliveryStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { delivery_status, pickup_status, agentId, pickupManId, deliveryManId, } = req.body;
    // Validate the required fields
    if (!delivery_status && !pickup_status) {
        return res
            .status(400)
            .json({ message: "Delivery status or pickup status is required" });
    }
    if (!agentId || !pickupManId || !deliveryManId) {
        return res
            .status(400)
            .json({ message: "Agent, PickupMan, and DeliveryMan IDs are required" });
    }
    try {
        // Find the delivery by ID, along with the necessary relations
        const delivery = yield data_source_1.AppDataSource.manager.findOne(Delivery_1.Delivery, {
            where: { id: Number(id) },
            relations: ["agent", "pickupMan", "deliveryMan", "merchant"],
        });
        if (!delivery) {
            return res.status(404).json({ message: "Delivery not found" });
        }
        // Check if the delivery or pickup status is already done (completed)
        const isCompleted = delivery.delivery_status === "Delivered" &&
            delivery.pickup_status === "Picked Up";
        // Update the agent, pickupMan, and deliveryMan based on the provided IDs
        const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
            where: { id: agentId },
        });
        const pickupMan = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
            where: { id: pickupManId },
        });
        const deliveryMan = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
            where: { id: deliveryManId },
        });
        if (!agent || !pickupMan || !deliveryMan) {
            return res
                .status(404)
                .json({ message: "Agent, PickupMan, or DeliveryMan not found" });
        }
        // Assign the new agent, pickupMan, and deliveryMan to the delivery
        delivery.agent = agent;
        delivery.pickupMan = pickupMan;
        delivery.deliveryMan = deliveryMan;
        // Update pickup status and delivery status if provided
        if (pickup_status)
            delivery.pickup_status = pickup_status;
        if (delivery_status)
            delivery.delivery_status = delivery_status;
        // If the delivery is completed (Delivered) and pickup is done (Picked Up),
        // Update balances only if it's not already completed
        if (!isCompleted) {
            const price = delivery.price || 0;
            const agentCut = price * 0.1; // 10% cut for agent
            const pickupManCut = price * 0.03; // 3% cut for pickup man
            const deliveryManCut = price * 0.02; // 2% cut for delivery man
            // Update the agent balance
            if (delivery.agent && delivery.agent.balance !== undefined) {
                delivery.agent.balance += agentCut;
                yield data_source_1.AppDataSource.manager.save(Agent_1.Agent, delivery.agent);
            }
            // Update the pickup man balance
            if (delivery.pickupMan && delivery.pickupMan.balance !== undefined) {
                delivery.pickupMan.balance += pickupManCut;
                yield data_source_1.AppDataSource.manager.save(PickupMan_1.PickupMan, delivery.pickupMan);
            }
            // Update the delivery man balance
            if (delivery.deliveryMan && delivery.deliveryMan.balance !== undefined) {
                delivery.deliveryMan.balance += deliveryManCut;
                yield data_source_1.AppDataSource.manager.save(DeliveryMan_1.DeliveryMan, delivery.deliveryMan);
            }
            // Calculate remaining balance for the merchant
            const remainingAmount = price - (agentCut + pickupManCut + deliveryManCut);
            // Update the merchant's balance (remaining amount after cuts)
            if (delivery.merchant && delivery.merchant.balance !== undefined) {
                delivery.merchant.balance += remainingAmount;
                yield data_source_1.AppDataSource.manager.save(Merchant_1.Merchant, delivery.merchant);
            }
        }
        // Save the updated delivery status
        yield data_source_1.AppDataSource.manager.save(Delivery_1.Delivery, delivery);
        return res
            .status(200)
            .json({ message: "Delivery status updated successfully", delivery });
    }
    catch (error) {
        console.error("Error updating delivery status:", error);
        return res.status(500).json({ message: "Error updating delivery status" });
    }
});
exports.updateDeliveryStatus = updateDeliveryStatus;
