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
// Create a new delivery
const createDelivery = (req, res) => {
    const createNewDelivery = () => __awaiter(void 0, void 0, void 0, function* () {
        const { store_name, product_type, merchant_id, recipient_name, recipient_phone, recipient_secondary_phone, address, area, instructions, delivery_type, total_weight, quantity, amount_to_collect, price, division, zilla, thana, delivery_charge, } = req.body;
        // Basic validation
        if (!store_name || !product_type || !recipient_name || !recipient_phone) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields", data: {} });
        }
        try {
            // Find the merchant in the database
            const merchant = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { id: merchant_id },
            });
            if (!merchant) {
                return res
                    .status(404)
                    .json({ success: false, message: "Merchant not found", data: {} });
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
            // Set default status to "Pending"
            delivery.delivery_status = "Pending";
            delivery.pickup_status = "Pending";
            // Save the new delivery to the database
            yield data_source_1.AppDataSource.manager.save(delivery);
            return res.status(201).json({
                success: true,
                message: "Delivery created successfully",
                data: delivery,
            });
        }
        catch (error) {
            console.error("Error saving delivery:", error);
            return res
                .status(500)
                .json({ success: false, message: "Error saving delivery", data: {} });
        }
    });
    // Call the inner async function
    createNewDelivery().catch((err) => {
        console.error("Unexpected error:", err);
        return res
            .status(500)
            .json({ success: false, message: "Unexpected error occurred", data: {} });
    });
};
exports.createDelivery = createDelivery;
// Update Delivery Status (Pickup & Delivery)
const updateDeliveryStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { delivery_status, pickup_status, agentId, pickupManId, deliveryManId, } = req.body;
    // // Validate the required fields
    // if (!delivery_status && !pickup_status) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Delivery status or pickup status is required",
    //     data: {},
    //   });
    // }
    try {
        // Find the delivery by ID, along with the necessary relations
        const delivery = yield data_source_1.AppDataSource.manager.findOne(Delivery_1.Delivery, {
            where: { id: Number(id) },
            relations: ["agent", "pickupMan", "deliveryMan", "merchant"],
        });
        if (!delivery) {
            return res
                .status(404)
                .json({ success: false, message: "Delivery not found", data: {} });
        }
        // Assign the agent if agentId is provided
        if (agentId) {
            const agent = yield data_source_1.AppDataSource.manager.findOne(Agent_1.Agent, {
                where: { id: agentId },
            });
            if (agent) {
                delivery.agent = agent;
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "Agent not found",
                    data: {},
                });
            }
        }
        // Assign the pickupMan if pickupManId is provided
        if (pickupManId) {
            const pickupMan = yield data_source_1.AppDataSource.manager.findOne(PickupMan_1.PickupMan, {
                where: { id: pickupManId },
            });
            if (pickupMan) {
                delivery.pickupMan = pickupMan;
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "Pickup Man not found",
                    data: {},
                });
            }
        }
        // Update the pickup_status if provided
        if (pickup_status) {
            delivery.pickup_status = pickup_status;
        }
        // Assign the deliveryMan if deliveryManId is provided
        if (deliveryManId) {
            const deliveryMan = yield data_source_1.AppDataSource.manager.findOne(DeliveryMan_1.DeliveryMan, {
                where: { id: deliveryManId },
            });
            if (deliveryMan) {
                delivery.deliveryMan = deliveryMan;
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "Delivery Man not found",
                    data: {},
                });
            }
        }
        // Update the delivery_status if provided
        if (delivery_status) {
            delivery.delivery_status = delivery_status;
        }
        // Check if both statuses are completed (Pick Up and Delivered) before distributing the money
        const isCompleted = delivery.delivery_status === "Delivered" &&
            delivery.pickup_status === "Picked Up";
        // If both statuses are completed, distribute the money
        if (isCompleted &&
            delivery.agent &&
            delivery.pickupMan &&
            delivery.deliveryMan) {
            const price = delivery.price || 0;
            // Split the price calculation into numeric operations (not string concatenation)
            const agentCut = price * 0.1; // 10% cut for agent
            const pickupManCut = price * 0.03; // 3% cut for pickup man
            const deliveryManCut = price * 0.02; // 2% cut for delivery man
            // Update agent balance
            if (delivery.agent.balance !== undefined) {
                delivery.agent.balance += agentCut;
                yield data_source_1.AppDataSource.manager.save(Agent_1.Agent, delivery.agent);
            }
            // Update pickup man balance
            if (delivery.pickupMan.balance !== undefined) {
                delivery.pickupMan.balance += pickupManCut;
                yield data_source_1.AppDataSource.manager.save(PickupMan_1.PickupMan, delivery.pickupMan);
            }
            // Update delivery man balance
            if (delivery.deliveryMan.balance !== undefined) {
                delivery.deliveryMan.balance += deliveryManCut;
                yield data_source_1.AppDataSource.manager.save(DeliveryMan_1.DeliveryMan, delivery.deliveryMan);
            }
            // Calculate remaining amount for the merchant
            const remainingAmount = price - (agentCut + pickupManCut + deliveryManCut);
            // Update merchant balance
            if (((_a = delivery.merchant) === null || _a === void 0 ? void 0 : _a.balance) !== undefined) {
                delivery.merchant.balance += remainingAmount;
                yield data_source_1.AppDataSource.manager.save(Merchant_1.Merchant, delivery.merchant);
            }
        }
        // Save the updated delivery status
        yield data_source_1.AppDataSource.manager.save(Delivery_1.Delivery, delivery);
        return res.status(200).json({
            success: true,
            message: "Delivery status updated successfully",
            data: delivery,
        });
    }
    catch (error) {
        console.error("Error updating delivery status:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating delivery status",
            data: {},
        });
    }
});
exports.updateDeliveryStatus = updateDeliveryStatus;
