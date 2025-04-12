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
exports.deleteArea = exports.updateArea = exports.createArea = exports.getAreaById = exports.getAllAreas = void 0;
const data_source_1 = require("../data-source");
const Area_1 = require("../entities/Area");
const repo = data_source_1.AppDataSource.getRepository(Area_1.Area);
const getAllAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const areas = yield repo.find({ relations: ["zone"] });
    res.json({ success: true, message: "Areas fetched.", data: areas });
});
exports.getAllAreas = getAllAreas;
const getAreaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const area = yield repo.findOne({
        where: { id: +req.params.id },
        relations: ["zone"],
    });
    if (!area)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    res.json({ success: true, message: "Area fetched.", data: area });
});
exports.getAreaById = getAreaById;
const createArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const area = repo.create(req.body);
    const saved = yield repo.save(area);
    res
        .status(201)
        .json({ success: true, message: "Area created.", data: saved });
});
exports.createArea = createArea;
const updateArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const area = yield repo.findOneBy({ id: +req.params.id });
    if (!area)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    repo.merge(area, req.body);
    const updated = yield repo.save(area);
    res.json({ success: true, message: "Area updated.", data: updated });
});
exports.updateArea = updateArea;
const deleteArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repo.delete(+req.params.id);
    if (result.affected === 0)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    res.json({
        success: true,
        message: "Area deleted.",
        data: { deleted: result.affected },
    });
});
exports.deleteArea = deleteArea;
