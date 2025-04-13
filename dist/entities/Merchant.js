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
exports.Merchant = void 0;
const typeorm_1 = require("typeorm");
const Delivery_1 = require("./Delivery");
const Message_1 = require("./Message");
const Promo_1 = require("./Promo");
let Merchant = class Merchant {
};
exports.Merchant = Merchant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Merchant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merchant.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merchant.prototype, "owner_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merchant.prototype, "mobile_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merchant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merchant.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0 }),
    __metadata("design:type", Number)
], Merchant.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Delivery_1.Delivery, (delivery) => delivery.merchant),
    __metadata("design:type", Array)
], Merchant.prototype, "deliveries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.merchantSender),
    __metadata("design:type", Array)
], Merchant.prototype, "sentMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.merchantReceiver),
    __metadata("design:type", Array)
], Merchant.prototype, "receivedMessages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Promo_1.Promo, (promo) => promo.users, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Merchant.prototype, "promos", void 0);
exports.Merchant = Merchant = __decorate([
    (0, typeorm_1.Entity)()
], Merchant);
