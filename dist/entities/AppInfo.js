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
exports.AppInfo = void 0;
const typeorm_1 = require("typeorm");
const Merchant_1 = require("./Merchant");
const Agent_1 = require("./Agent");
const PickupMan_1 = require("./PickupMan");
const DeliveryMan_1 = require("./DeliveryMan");
const Operator_1 = require("./Operator");
let AppInfo = class AppInfo {
};
exports.AppInfo = AppInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], AppInfo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "shareLink", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "privacyPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "latest_app_version", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "latest_ios_version", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], AppInfo.prototype, "is_update_available", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "update_note", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "google_play_update_link", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppInfo.prototype, "app_store_update_link", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Merchant_1.Merchant, (merchant) => merchant.appInfos, {
        nullable: true,
    }),
    __metadata("design:type", Merchant_1.Merchant)
], AppInfo.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, (agent) => agent.appInfos, {
        nullable: true,
    }),
    __metadata("design:type", Agent_1.Agent)
], AppInfo.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PickupMan_1.PickupMan, (pickupMan) => pickupMan.appInfos, {
        nullable: true,
    }),
    __metadata("design:type", PickupMan_1.PickupMan)
], AppInfo.prototype, "pickupMan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryMan_1.DeliveryMan, (deliveryMan) => deliveryMan.appInfos, {
        nullable: true,
    }),
    __metadata("design:type", DeliveryMan_1.DeliveryMan)
], AppInfo.prototype, "deliveryMan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Operator_1.Operator, (operator) => operator.appInfos, {
        nullable: true,
    }),
    __metadata("design:type", Operator_1.Operator)
], AppInfo.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AppInfo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AppInfo.prototype, "updatedAt", void 0);
exports.AppInfo = AppInfo = __decorate([
    (0, typeorm_1.Entity)()
], AppInfo);
