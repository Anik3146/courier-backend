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
exports.deleteDistrict = exports.updateDistrict = exports.createDistrict = exports.getDistrictById = exports.getAllDistricts = void 0;
const data_source_1 = require("../data-source");
const District_1 = require("../entities/District");
const repo = data_source_1.AppDataSource.getRepository(District_1.District);
const getAllDistricts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const districts = yield repo.find({ relations: ["zones"] });
    res.json({ success: true, message: "Districts fetched.", data: districts });
});
exports.getAllDistricts = getAllDistricts;
const getDistrictById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const district = yield repo.findOne({
        where: { id: +req.params.id },
        relations: ["zones"],
    });
    if (!district)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    res.json({ success: true, message: "District fetched.", data: district });
});
exports.getDistrictById = getDistrictById;
const createDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const district = repo.create(req.body);
    const saved = yield repo.save(district);
    res
        .status(201)
        .json({ success: true, message: "District created.", data: saved });
});
exports.createDistrict = createDistrict;
const updateDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const district = yield repo.findOneBy({ id: +req.params.id });
    if (!district)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    repo.merge(district, req.body);
    const updated = yield repo.save(district);
    res.json({ success: true, message: "District updated.", data: updated });
});
exports.updateDistrict = updateDistrict;
const deleteDistrict = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repo.delete(+req.params.id);
    if (result.affected === 0)
        return res
            .status(404)
            .json({ success: false, message: "Not found", data: null });
    res.json({
        success: true,
        message: "District deleted.",
        data: { deleted: result.affected },
    });
});
exports.deleteDistrict = deleteDistrict;
