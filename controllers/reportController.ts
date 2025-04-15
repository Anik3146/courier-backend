// src/controllers/reportController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Report } from "../entities/Report";

// Create Report
export const createReport = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user_type, issue } = req.body;

  if (!user_type || !issue) {
    return res.status(400).json({
      success: false,
      message: "user_type and issue are required",
      data: {},
    });
  }

  try {
    const report = new Report();
    report.user_type = user_type;
    report.issue = issue;

    await AppDataSource.manager.save(report);
    return res.status(201).json({
      success: true,
      message: "Report created successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};

// Delete Report by ID
export const deleteReport = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const report = await AppDataSource.manager.findOne(Report, {
      where: { id: Number(id) },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
        data: {},
      });
    }

    await AppDataSource.manager.remove(report);
    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
    });
  }
};

// Get All Reports
export const getReports = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const reports = await AppDataSource.manager.find(Report, {
      order: { created_at: "DESC" },
    });

    return res.status(200).json({
      success: true,
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching reports",
      data: [],
    });
  }
};
