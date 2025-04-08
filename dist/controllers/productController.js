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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const data_source_1 = require("../data-source"); // Ensure AppDataSource is correctly initialized
const Products_1 = require("../entities/Products");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, product_type } = req.body;
    if (!product_name || !product_type) {
        return res
            .status(400)
            .json({ message: "Product name and type are required" });
    }
    try {
        const product = new Products_1.Product();
        product.product_name = product_name;
        product.product_type = product_type;
        // Save the new product
        yield data_source_1.AppDataSource.manager.save(Products_1.Product, product);
        return res.status(201).json(product);
    }
    catch (error) {
        console.error("Error saving product:", error);
        return res.status(500).json({ message: "Failed to create product" });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield data_source_1.AppDataSource.manager.find(Products_1.Product);
        return res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Failed to fetch products" });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield data_source_1.AppDataSource.manager.findOne(Products_1.Product, {
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({ message: "Failed to fetch product" });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { product_name, product_type } = req.body;
    try {
        const product = yield data_source_1.AppDataSource.manager.findOne(Products_1.Product, {
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.product_name = product_name || product.product_name;
        product.product_type = product_type || product.product_type;
        const updatedProduct = yield data_source_1.AppDataSource.manager.save(Products_1.Product, product);
        return res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Failed to update product" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield data_source_1.AppDataSource.manager.findOne(Products_1.Product, {
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        yield data_source_1.AppDataSource.manager.remove(Products_1.Product, product);
        return res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Failed to delete product" });
    }
});
exports.deleteProduct = deleteProduct;
