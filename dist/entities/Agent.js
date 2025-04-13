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
exports.Agent = void 0;
const typeorm_1 = require("typeorm");
const Thana_1 = require("./Thana");
const PickupMan_1 = require("./PickupMan");
const DeliveryMan_1 = require("./DeliveryMan");
const Delivery_1 = require("./Delivery");
const Message_1 = require("./Message");
const Operator_1 = require("./Operator");
let Agent = class Agent {
};
exports.Agent = Agent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Agent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Agent.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0 }),
    __metadata("design:type", Number)
], Agent.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Thana_1.Thana, (thana) => thana.agents),
    __metadata("design:type", Thana_1.Thana)
], Agent.prototype, "thana", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PickupMan_1.PickupMan, (pickupMan) => pickupMan.agent),
    __metadata("design:type", Array)
], Agent.prototype, "pickupMen", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DeliveryMan_1.DeliveryMan, (deliveryMan) => deliveryMan.agent),
    __metadata("design:type", Array)
], Agent.prototype, "deliveryMen", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Delivery_1.Delivery, (delivery) => delivery.agent),
    __metadata("design:type", Array)
], Agent.prototype, "deliveries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.agentSender),
    __metadata("design:type", Array)
], Agent.prototype, "sentMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.agentReceiver),
    __metadata("design:type", Array)
], Agent.prototype, "receivedMessages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Operator_1.Operator, (operator) => operator.agents, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Operator_1.Operator)
], Agent.prototype, "operator", void 0);
exports.Agent = Agent = __decorate([
    (0, typeorm_1.Entity)()
], Agent);
