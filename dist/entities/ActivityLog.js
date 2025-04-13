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
exports.ActivityLog = void 0;
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./Merchant");
const Agent_1 = require("./Agent");
const PickupMan_1 = require("./PickupMan");
const DeliveryMan_1 = require("./DeliveryMan");
const Operator_1 = require("./Operator");
let ActivityLog = class ActivityLog {
};
exports.ActivityLog = ActivityLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActivityLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ActivityLog.prototype, "activity_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "newAppuserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "phone_no", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "IMEI", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ActivityLog.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ActivityLog.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Merchant_1.Merchant, (merchant) => merchant.activityLogs, {
        nullable: true,
    }),
    __metadata("design:type", Merchant_1.Merchant)
], ActivityLog.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, (agent) => agent.activityLogs, { nullable: true }),
    __metadata("design:type", Agent_1.Agent)
], ActivityLog.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupMan_1.PickupMan, (pickupMan) => pickupMan.activityLogs, {
        nullable: true,
    }),
    __metadata("design:type", PickupMan_1.PickupMan)
], ActivityLog.prototype, "pickupMan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryMan_1.DeliveryMan, (deliveryMan) => deliveryMan.activityLogs, {
        nullable: true,
    }),
    __metadata("design:type", DeliveryMan_1.DeliveryMan)
], ActivityLog.prototype, "deliveryMan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Operator_1.Operator, (operator) => operator.activityLogs, {
        nullable: true,
    }),
    __metadata("design:type", Operator_1.Operator)
], ActivityLog.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ActivityLog.prototype, "createdAt", void 0);
exports.ActivityLog = ActivityLog = __decorate([
    (0, typeorm_1.Entity)()
], ActivityLog);
