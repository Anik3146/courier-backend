import { Router } from "express";
import {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../controllers/districtController";

const router = Router();

router.post("/", async (req, res) => {
  try {
    await createDistrict(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating district", data: null });
  }
});

router.get("/", async (req, res) => {
  try {
    await getAllDistricts(req, res);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching districts",
        data: null,
      });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await getDistrictById(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching district", data: null });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await updateDistrict(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating district", data: null });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteDistrict(req, res);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting district", data: null });
  }
});

export default router;
