import express from "express";
import {
  updateInvoice,
  deleteInvoice,
  getAllInvoices,
} from "../controllers/invoiceController";

const router = express.Router();

// ✅ Update Invoice
router.patch("/:id", async (req, res) => {
  try {
    await updateInvoice(req, res);
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({
      message: "An unexpected error occurred while updating invoice.",
    });
  }
});

// ❌ Delete Invoice
router.delete("/:id", async (req, res) => {
  try {
    await deleteInvoice(req, res);
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({
      message: "An unexpected error occurred while deleting invoice.",
    });
  }
});

// ✅ Get All Invoices
router.get("/", async (req, res) => {
  try {
    await getAllInvoices(req, res);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({
      message: "An unexpected error occurred while fetching invoices.",
    });
  }
});

//get all invoice

export default router;
