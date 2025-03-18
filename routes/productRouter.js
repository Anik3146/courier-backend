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
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
// Routes for Product
// Create Product
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productController_1.createProduct)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in creating product:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get all Products
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productController_1.getProducts)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching products:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Get Product by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productController_1.getProductById)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in fetching product by ID:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Update Product
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productController_1.updateProduct)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in updating product:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
// Delete Product
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productController_1.deleteProduct)(req, res); // Call your controller function
    }
    catch (error) {
        console.error("Error in deleting product:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
}));
exports.default = router;
