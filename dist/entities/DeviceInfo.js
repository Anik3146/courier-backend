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
exports.DeviceInfo = void 0;
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./Merchant");
const Agent_1 = require("./Agent");
const PickupMan_1 = require("./PickupMan");
const DeliveryMan_1 = require("./DeliveryMan");
const Operator_1 = require("./Operator");
let DeviceInfo = class DeviceInfo {
};
exports.DeviceInfo = DeviceInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeviceInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "fingerprint", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeviceInfo.prototype, "IMEI", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeviceInfo.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeviceInfo.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Merchant_1.Merchant, (merchant) => merchant.deviceInfos, {
        nullable: true,
    }),
    __metadata("design:type", Merchant_1.Merchant)
], DeviceInfo.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, (agent) => agent.deviceInfos, {
        nullable: true,
    }),
    __metadata("design:type", Agent_1.Agent)
], DeviceInfo.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupMan_1.PickupMan, (pickupMan) => pickupMan.deviceInfos, {
        nullable: true,
    }),
    __metadata("design:type", PickupMan_1.PickupMan)
], DeviceInfo.prototype, "pickupMan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryMan_1.DeliveryMan, (deliveryMan) => deliveryMan.deviceInfos, {
        nullable: true,
    }),
    __metadata("design:type", DeliveryMan_1.DeliveryMan)
], DeviceInfo.prototype, "deliveryMan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Operator_1.Operator, (operator) => operator.deviceInfos, {
        nullable: true,
    }),
    __metadata("design:type", Operator_1.Operator)
], DeviceInfo.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], DeviceInfo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], DeviceInfo.prototype, "updatedAt", void 0);
exports.DeviceInfo = DeviceInfo = __decorate([
    (0, typeorm_1.Entity)()
], DeviceInfo);
