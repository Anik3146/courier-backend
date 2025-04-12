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
exports.deleteZone = exports.updateZone = exports.createZone = exports.getZoneById = exports.getAllZones = void 0;
const data_source_1 = require("../data-source");
const Zone_1 = require("../entities/Zone");
const repo = data_source_1.AppDataSource.getRepository(Zone_1.Zone);
const getAllZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zones = yield repo.find({ relations: ["district", "areas"] });
    res.json({ success: true, message: "Zones fetched.", data: zones });
});
exports.getAllZones = getAllZones;
const getZoneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zone = yield repo.findOne({
        where: { id: +req.params.id },
        relations: ["district", "areas"],
    });
    if (!zone)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    res.json({ success: true, message: "Zone fetched.", data: zone });
});
exports.getZoneById = getZoneById;
const createZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zone = repo.create(req.body);
    const saved = yield repo.save(zone);
    res
        .status(201)
        .json({ success: true, message: "Zone created.", data: saved });
});
exports.createZone = createZone;
const updateZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zone = yield repo.findOneBy({ id: +req.params.id });
    if (!zone)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    repo.merge(zone, req.body);
    const updated = yield repo.save(zone);
    res.json({ success: true, message: "Zone updated.", data: updated });
});
exports.updateZone = updateZone;
const deleteZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repo.delete(+req.params.id);
    if (result.affected === 0)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    res.json({
        success: true,
        message: "Zone deleted.",
        data: { deleted: result.affected },
    });
});
exports.deleteZone = deleteZone;
