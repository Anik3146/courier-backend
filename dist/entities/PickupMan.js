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
exports.PickupMan = void 0;
const typeorm_1 = require("typeorm");
const Agent_1 = require("./Agent");
const Thana_1 = require("./Thana");
const Message_1 = require("./Message");
const AppInfo_1 = require("./AppInfo");
const ActivityLog_1 = require("./ActivityLog");
const DeviceInfo_1 = require("./DeviceInfo");
let PickupMan = class PickupMan {
};
exports.PickupMan = PickupMan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PickupMan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PickupMan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", default: 0 }),
    __metadata("design:type", Number)
], PickupMan.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Agent_1.Agent, (agent) => agent.pickupMen),
    __metadata("design:type", Agent_1.Agent)
], PickupMan.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Thana_1.Thana, (thana) => thana.agents),
    __metadata("design:type", Thana_1.Thana)
], PickupMan.prototype, "thana", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.pickupManSender),
    __metadata("design:type", Array)
], PickupMan.prototype, "sentMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.pickupManReceiver),
    __metadata("design:type", Array)
], PickupMan.prototype, "receivedMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AppInfo_1.AppInfo, (appInfo) => appInfo.pickupMan),
    __metadata("design:type", Array)
], PickupMan.prototype, "appInfos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ActivityLog_1.ActivityLog, (activityLog) => activityLog.pickupMan),
    __metadata("design:type", Array)
], PickupMan.prototype, "activityLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DeviceInfo_1.DeviceInfo, (deviceInfo) => deviceInfo.pickupMan),
    __metadata("design:type", Array)
], PickupMan.prototype, "deviceInfos", void 0);
exports.PickupMan = PickupMan = __decorate([
    (0, typeorm_1.Entity)()
], PickupMan);
