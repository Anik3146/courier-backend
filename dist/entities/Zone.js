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
exports.Zone = void 0;
const typeorm_1 = require("typeorm");
const District_1 = require("./District");
const Area_1 = require("./Area");
let Zone = class Zone {
};
exports.Zone = Zone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Zone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Zone.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => District_1.District, (district) => district.zones),
    __metadata("design:type", District_1.District)
], Zone.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Area_1.Area, (area) => area.zone),
    __metadata("design:type", Array)
], Zone.prototype, "areas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Zone.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Zone.prototype, "updated_at", void 0);
exports.Zone = Zone = __decorate([
    (0, typeorm_1.Entity)()
], Zone);
