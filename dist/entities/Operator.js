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
exports.Operator = void 0;
const typeorm_1 = require("typeorm");
const District_1 = require("./District");
const Thana_1 = require("./Thana");
const Agent_1 = require("./Agent");
const AppInfo_1 = require("./AppInfo");
const ActivityLog_1 = require("./ActivityLog");
const DeviceInfo_1 = require("./DeviceInfo");
let Operator = class Operator {
};
exports.Operator = Operator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Operator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Operator.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Operator.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => District_1.District, (district) => district.operators),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Operator.prototype, "districts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Thana_1.Thana, (thana) => thana.operators),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Operator.prototype, "thanas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Agent_1.Agent, (agent) => agent.operator),
    __metadata("design:type", Array)
], Operator.prototype, "agents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AppInfo_1.AppInfo, (appInfo) => appInfo.operator),
    __metadata("design:type", Array)
], Operator.prototype, "appInfos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ActivityLog_1.ActivityLog, (activityLog) => activityLog.operator),
    __metadata("design:type", Array)
], Operator.prototype, "activityLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DeviceInfo_1.DeviceInfo, (deviceInfo) => deviceInfo.operator),
    __metadata("design:type", Array)
], Operator.prototype, "deviceInfos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Operator.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Operator.prototype, "updated_at", void 0);
exports.Operator = Operator = __decorate([
    (0, typeorm_1.Entity)()
], Operator);
