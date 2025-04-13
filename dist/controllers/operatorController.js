"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOperator = exports.updateOperator = exports.createOperator = exports.getOperatorById = exports.getAllOperators = void 0;
const data_source_1 = require("../data-source");
const Operator_1 = require("../entities/Operator");
const operatorRepo = data_source_1.AppDataSource.getRepository(Operator_1.Operator);
const getAllOperators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operators = yield operatorRepo.find({
        relations: ["districts", "thanas"],
    });
    res.json({ success: true, data: operators });
});
exports.getAllOperators = getAllOperators;
const getOperatorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operator = yield operatorRepo.findOne({
        where: { id: +req.params.id },
        relations: ["districts", "thanas"],
    });
    if (!operator)
        return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: operator });
});
exports.getOperatorById = getOperatorById;
const createOperator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operator = operatorRepo.create(req.body);
    const saved = yield operatorRepo.save(operator);
    res.status(201).json({ success: true, data: saved });
});
exports.createOperator = createOperator;
const updateOperator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operator = yield operatorRepo.findOneBy({ id: +req.params.id });
    if (!operator)
        return res.status(404).json({ success: false, message: "Not found" });
    operatorRepo.merge(operator, req.body);
    const updated = yield operatorRepo.save(operator);
    res.json({ success: true, data: updated });
});
exports.updateOperator = updateOperator;
const deleteOperator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield operatorRepo.delete(+req.params.id);
    if (result.affected === 0)
        return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Operator deleted" });
});
exports.deleteOperator = deleteOperator;
