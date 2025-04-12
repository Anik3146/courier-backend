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
exports.deleteStore = exports.updateStore = exports.createStore = exports.getStoreById = exports.getAllStores = void 0;
const data_source_1 = require("../data-source");
const Store_1 = require("../entities/Store");
const repo = data_source_1.AppDataSource.getRepository(Store_1.Store);
// Get All Stores
const getAllStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield repo.find();
    res.json({
        success: true,
        message: "Stores fetched successfully.",
        data: stores,
    });
});
exports.getAllStores = getAllStores;
// Get Store by ID
const getStoreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield repo.findOneBy({ id: Number(req.params.id) });
    if (!store) {
        return res.status(404).json({
            success: false,
            message: "Store not found.",
            data: null,
        });
    }
    res.json({
        success: true,
        message: "Store fetched successfully.",
        data: store,
    });
});
exports.getStoreById = getStoreById;
// Create Store
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const store = repo.create(req.body);
    const result = yield repo.save(store);
    res.status(201).json({
        success: true,
        message: "Store created successfully.",
        data: result,
    });
});
exports.createStore = createStore;
// Update Store
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const store = yield repo.findOneBy({ id });
    if (!store) {
        return res.status(404).json({
            success: false,
            message: "Store not found.",
            data: null,
        });
    }
    repo.merge(store, req.body);
    const result = yield repo.save(store);
    res.json({
        success: true,
        message: "Store updated successfully.",
        data: result,
    });
});
exports.updateStore = updateStore;
// Delete Store
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield repo.delete(req.params.id);
    const deleted = (_a = result.affected) !== null && _a !== void 0 ? _a : 0;
    if (deleted === 0) {
        return res.status(404).json({
            success: false,
            message: "Store not found or already deleted.",
            data: null,
        });
    }
    res.json({
        success: true,
        message: "Store deleted successfully.",
        data: { deleted },
    });
});
exports.deleteStore = deleteStore;
