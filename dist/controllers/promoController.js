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
exports.deletePromo = exports.updatePromo = exports.createPromo = exports.getPromoById = exports.getAllPromos = void 0;
const data_source_1 = require("../data-source");
const Promo_1 = require("../entities/Promo");
const promoRepo = data_source_1.AppDataSource.getRepository(Promo_1.Promo);
const getAllPromos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promos = yield promoRepo.find();
    res.json({ success: true, data: promos });
});
exports.getAllPromos = getAllPromos;
const getPromoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promo = yield promoRepo.findOneBy({ id: +req.params.id });
    if (!promo)
        return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: promo });
});
exports.getPromoById = getPromoById;
const createPromo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promo = promoRepo.create(req.body);
    const saved = yield promoRepo.save(promo);
    res.status(201).json({ success: true, data: saved });
});
exports.createPromo = createPromo;
const updatePromo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const promo = yield promoRepo.findOneBy({ id: +req.params.id });
    if (!promo)
        return res.status(404).json({ success: false, message: "Not found" });
    promoRepo.merge(promo, req.body);
    const updated = yield promoRepo.save(promo);
    res.json({ success: true, data: updated });
});
exports.updatePromo = updatePromo;
const deletePromo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield promoRepo.delete(+req.params.id);
    if (result.affected === 0)
        return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Promo deleted" });
});
exports.deletePromo = deletePromo;
