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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMerchantById = exports.signInMerchant = exports.registerMerchant = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source"); // Assume AppDataSource is your DB connection
const Merchant_1 = require("../entities/Merchant");
const JWT_SECRET = process.env.JWT_SECRET || "courier_bd_app";
// Register Merchant
const registerMerchant = (req, res) => {
    // The outer function is synchronous
    const register = () => __awaiter(void 0, void 0, void 0, function* () {
        const { company_name, owner_name, mobile_number, email, password } = req.body;
        if (!company_name || !owner_name || !mobile_number || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                data: null,
            });
        }
        try {
            // Find if the email already exists
            const existingMerchant = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { email },
            });
            if (existingMerchant) {
                return res.status(400).json({
                    success: false,
                    message: "Email is already in use",
                    data: null,
                });
            }
            // Hash the password before saving
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const merchant = new Merchant_1.Merchant();
            merchant.company_name = company_name;
            merchant.owner_name = owner_name;
            merchant.mobile_number = mobile_number;
            merchant.email = email;
            merchant.password = hashedPassword;
            // Try saving the merchant to the DB
            yield data_source_1.AppDataSource.manager.save(merchant);
            return res.status(201).json({
                success: true,
                message: "Merchant registered successfully",
                data: {
                    id: merchant.id,
                    company_name: merchant.company_name,
                    owner_name: merchant.owner_name,
                    email: merchant.email,
                },
            });
        }
        catch (error) {
            console.error("Error saving merchant:", error);
            return res.status(500).json({
                success: false,
                message: "Error saving merchant",
                data: null,
            });
        }
    });
    // Call the inner async function
    register().catch((err) => {
        console.error("Unexpected error:", err);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
            data: null,
        });
    });
};
exports.registerMerchant = registerMerchant;
// Sign-In Merchant
const signInMerchant = (req, res) => {
    // The outer function is synchronous
    const signIn = () => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
                data: null,
            });
        }
        try {
            // Find the merchant by email
            const merchant = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { email },
            });
            if (!merchant || !merchant.password) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password",
                    data: null,
                });
            }
            // Compare passwords
            const passwordMatch = yield bcrypt_1.default.compare(password, merchant.password);
            if (!passwordMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password",
                    data: null,
                });
            }
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ id: merchant.id, email: merchant.email }, JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({
                success: true,
                message: "Sign-in successful",
                data: { token },
            });
        }
        catch (error) {
            console.error("Error during sign-in:", error);
            return res.status(500).json({
                success: false,
                message: "Error during sign-in",
                data: null,
            });
        }
    });
    // Call the inner async function
    signIn().catch((err) => {
        console.error("Unexpected error:", err);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
            data: null,
        });
    });
};
exports.signInMerchant = signInMerchant;
// Get Merchant by ID and Match with Token
const getMerchantById = (req, res) => {
    // The outer function is synchronous
    const getMerchant = () => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { user } = req; // Extract user information from the token
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Merchant ID is required",
                data: null,
            });
        }
        // Convert id to a number (assuming the id is a number in the database)
        const merchantId = parseInt(id, 10);
        if (isNaN(merchantId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Merchant ID format",
                data: null,
            });
        }
        // Ensure the ID from the URL matches the authenticated user's ID
        if (merchantId !== (user === null || user === void 0 ? void 0 : user.id)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this merchant's data",
                data: null,
            });
        }
        try {
            // Find the merchant by ID
            const merchant = yield data_source_1.AppDataSource.manager.findOne(Merchant_1.Merchant, {
                where: { id: merchantId },
            });
            if (!merchant) {
                return res.status(404).json({
                    success: false,
                    message: "Merchant not found",
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: "Merchant found",
                data: merchant,
            });
        }
        catch (error) {
            console.error("Error during retrieving merchant by ID:", error);
            return res.status(500).json({
                success: false,
                message: "Error during retrieving merchant by ID",
                data: null,
            });
        }
    });
    // Call the inner async function
    getMerchant().catch((err) => {
        console.error("Unexpected error:", err);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred",
            data: null,
        });
    });
};
exports.getMerchantById = getMerchantById;
