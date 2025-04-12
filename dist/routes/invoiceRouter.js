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
const express_1 = __importDefault(require("express"));
const invoiceController_1 = require("../controllers/invoiceController");
const router = express_1.default.Router();
// ✅ Update Invoice
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, invoiceController_1.updateInvoice)(req, res);
    }
    catch (error) {
        console.error("Error updating invoice:", error);
        res.status(500).json({
            message: "An unexpected error occurred while updating invoice.",
        });
    }
}));
// ❌ Delete Invoice
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, invoiceController_1.deleteInvoice)(req, res);
    }
    catch (error) {
        console.error("Error deleting invoice:", error);
        res.status(500).json({
            message: "An unexpected error occurred while deleting invoice.",
        });
    }
}));
// ✅ Get All Invoices
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, invoiceController_1.getAllInvoices)(req, res);
    }
    catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({
            message: "An unexpected error occurred while fetching invoices.",
        });
    }
}));
//get all invoice
exports.default = router;
