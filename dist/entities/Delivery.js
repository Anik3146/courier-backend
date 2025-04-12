"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./Merchant");
const Agent_1 = require("./Agent");
const PickupMan_1 = require("./PickupMan");
const DeliveryMan_1 = require("./DeliveryMan");
let Delivery = class Delivery {
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "store_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "product_type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Merchant_1.Merchant, (merchant) => merchant.deliveries),
    __metadata("design:type", Merchant_1.Merchant)
], Delivery.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "recipient_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "recipient_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Delivery.prototype, "recipient_secondary_phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Delivery.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "delivery_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Delivery.prototype, "total_weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Delivery.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Delivery.prototype, "amount_to_collect", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Delivery.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "division", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "zilla", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "thana", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: [
            "Pending",
            "Picked Up",
            "At Sorting",
            "In Transit",
            "At Delivery Hub",
            "Assigned to Delivery",
            "On Hold",
            "Delivered",
            "Returned",
            "Reverse Delivery",
        ],
        default: "Pending",
    }),
    __metadata("design:type", String)
], Delivery.prototype, "delivery_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Unpaid" }),
    __metadata("design:type", String)
], Delivery.prototype, "payment_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Pending" }),
    __metadata("design:type", String)
], Delivery.prototype, "pickup_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", Agent_1.Agent)
], Delivery.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupMan_1.PickupMan),
    (0, typeorm_1.JoinColumn)({ name: "pickup_man_id" }),
    __metadata("design:type", PickupMan_1.PickupMan)
], Delivery.prototype, "pickupMan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryMan_1.DeliveryMan),
    (0, typeorm_1.JoinColumn)({ name: "delivery_man_id" }),
    __metadata("design:type", DeliveryMan_1.DeliveryMan)
], Delivery.prototype, "deliveryMan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal" }),
    __metadata("design:type", Number)
], Delivery.prototype, "delivery_charge", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)()
], Delivery);
