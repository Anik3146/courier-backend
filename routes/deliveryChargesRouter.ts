import { Router } from "express";
import {
  createDeliveryCharge,
  getDeliveryCharges,
  getDeliveryChargeById,
  updateDeliveryCharge,
  deleteDeliveryCharge,
} from "../controllers/deliveryChargesController";

const router = Router();

// Routes for Delivery Charges
router.post("/", async (req, res) => {
  try {
    await createDeliveryCharge(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in delivery charge route:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

router.get("/", async (req, res) => {
  try {
    await getDeliveryCharges(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching delivery charges:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await getDeliveryChargeById(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in fetching delivery charge by ID:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await updateDeliveryCharge(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in updating delivery charge:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteDeliveryCharge(req, res); // Call your controller function
  } catch (error) {
    console.error("Error in deleting delivery charge:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

export default router;
