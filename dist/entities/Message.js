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
exports.Message = void 0;
// Message.ts
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./Merchant");
const Agent_1 = require("./Agent");
const PickupMan_1 = require("./PickupMan");
const DeliveryMan_1 = require("./DeliveryMan");
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "senderType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Message.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "receiverType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Message.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Merchant_1.Merchant, (merchant) => merchant.sentMessages, {
        nullable: true,
    }),
    __metadata("design:type", Merchant_1.Merchant)
], Message.prototype, "merchantSender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, (agent) => agent.sentMessages, { nullable: true }),
    __metadata("design:type", Agent_1.Agent)
], Message.prototype, "agentSender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupMan_1.PickupMan, (pickupMan) => pickupMan.sentMessages, {
        nullable: true,
    }),
    __metadata("design:type", PickupMan_1.PickupMan)
], Message.prototype, "pickupManSender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryMan_1.DeliveryMan, (deliveryMan) => deliveryMan.sentMessages, {
        nullable: true,
    }),
    __metadata("design:type", DeliveryMan_1.DeliveryMan)
], Message.prototype, "deliveryManSender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Merchant_1.Merchant, (merchant) => merchant.receivedMessages, {
        nullable: true,
    }),
    __metadata("design:type", Merchant_1.Merchant)
], Message.prototype, "merchantReceiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, (agent) => agent.receivedMessages, { nullable: true }),
    __metadata("design:type", Agent_1.Agent)
], Message.prototype, "agentReceiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupMan_1.PickupMan, (pickupMan) => pickupMan.receivedMessages, {
        nullable: true,
    }),
    __metadata("design:type", PickupMan_1.PickupMan)
], Message.prototype, "pickupManReceiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryMan_1.DeliveryMan, (deliveryMan) => deliveryMan.receivedMessages, {
        nullable: true,
    }),
    __metadata("design:type", DeliveryMan_1.DeliveryMan)
], Message.prototype, "deliveryManReceiver", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)()
], Message);
