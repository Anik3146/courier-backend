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
exports.Thana = void 0;
const typeorm_1 = require("typeorm");
const Agent_1 = require("./Agent");
const Operator_1 = require("./Operator");
let Thana = class Thana {
};
exports.Thana = Thana;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Thana.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Thana.prototype, "thana_name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Agent_1.Agent, (agent) => agent.thana),
    __metadata("design:type", Array)
], Thana.prototype, "agents", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Operator_1.Operator, (operator) => operator.thanas),
    __metadata("design:type", Array)
], Thana.prototype, "operators", void 0);
exports.Thana = Thana = __decorate([
    (0, typeorm_1.Entity)()
], Thana);
