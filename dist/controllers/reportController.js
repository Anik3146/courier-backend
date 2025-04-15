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
exports.getReports = exports.deleteReport = exports.createReport = void 0;
const data_source_1 = require("../data-source");
const Report_1 = require("../entities/Report");
// Create Report
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_type, issue } = req.body;
    if (!user_type || !issue) {
        return res.status(400).json({
            success: false,
            message: "user_type and issue are required",
            data: {},
        });
    }
    try {
        const report = new Report_1.Report();
        report.user_type = user_type;
        report.issue = issue;
        yield data_source_1.AppDataSource.manager.save(report);
        return res.status(201).json({
            success: true,
            message: "Report created successfully",
            data: report,
        });
    }
    catch (error) {
        console.error("Error creating report:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: {},
        });
    }
});
exports.createReport = createReport;
// Delete Report by ID
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const report = yield data_source_1.AppDataSource.manager.findOne(Report_1.Report, {
            where: { id: Number(id) },
        });
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
                data: {},
            });
        }
        yield data_source_1.AppDataSource.manager.remove(report);
        return res.status(200).json({
            success: true,
            message: "Report deleted successfully",
            data: {},
        });
    }
    catch (error) {
        console.error("Error deleting report:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: {},
        });
    }
});
exports.deleteReport = deleteReport;
// Get All Reports
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield data_source_1.AppDataSource.manager.find(Report_1.Report, {
            order: { created_at: "DESC" },
        });
        return res.status(200).json({
            success: true,
            message: "Reports fetched successfully",
            data: reports,
        });
    }
    catch (error) {
        console.error("Error fetching reports:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching reports",
            data: [],
        });
    }
});
exports.getReports = getReports;
