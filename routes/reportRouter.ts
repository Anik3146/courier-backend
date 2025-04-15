import { Router } from "express";
import {
  createReport,
  deleteReport,
  getReports,
} from "../controllers/reportController";

const router = Router();

// Routes for Report

// Create Report
router.post("/", async (req, res) => {
  try {
    await createReport(req, res);
  } catch (error) {
    console.error("Error in creating report:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Get All Reports
router.get("/", async (req, res) => {
  try {
    await getReports(req, res);
  } catch (error) {
    console.error("Error in fetching reports:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Delete Report by ID
router.delete("/:id", async (req, res) => {
  try {
    await deleteReport(req, res);
  } catch (error) {
    console.error("Error in deleting report:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
