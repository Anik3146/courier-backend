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
// Create Product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, product_type } = req.body;
    if (!product_name || !product_type) {
        return res.status(400).json({
            success: false,
            message: "Product name and type are required",
            data: {},
        });
    }
    try {
        const product = new Products_1.Product();
        product.product_name = product_name;
        product.product_type = product_type;
        // Save the new product
        yield data_source_1.AppDataSource.manager.save(Products_1.Product, product);
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        console.error("Error saving product:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create product",
            data: {},
        });
    }
});
exports.createProduct = createProduct;
// Get all Products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield data_source_1.AppDataSource.manager.find(Products_1.Product);
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            data: {},
        });
    }
});
exports.getProducts = getProducts;
// Get Product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield data_source_1.AppDataSource.manager.findOne(Products_1.Product, {
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: {},
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    }
    catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            data: {},
        });
    }
});
exports.getProductById = getProductById;
// Update Product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { product_name, product_type } = req.body;
    try {
        const product = yield data_source_1.AppDataSource.manager.findOne(Products_1.Product, {
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: {},
            });
        }
        product.product_name = product_name || product.product_name;
        product.product_type = product_type || product.product_type;
        const updatedProduct = yield data_source_1.AppDataSource.manager.save(Products_1.Product, product);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update product",
            data: {},
        });
    }
});
exports.updateProduct = updateProduct;
// Delete Product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield data_source_1.AppDataSource.manager.findOne(Products_1.Product, {
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: {},
            });
        }
        yield data_source_1.AppDataSource.manager.remove(Products_1.Product, product);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete product",
            data: {},
        });
    }
});
exports.deleteProduct = deleteProduct;
