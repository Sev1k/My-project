import express from "express";

const router = express.Router();

import {
  cancelBooking,
  getAllBooking,
  getAvailableSlots,
  getBookingById,
  createBooking,
  getBookingByToken,
  updateBookingByToken,
  cancelBookingByToken,
} from "../controllers/bookingController.js";
import {
  validateBookingData,
  validateGetBookingsQuery,
  validateObjectId,
} from "../middlewares/validation.js";

router.get("/", validateGetBookingsQuery, getAllBooking);
router.get("/available", getAvailableSlots);
router.get("/:id", validateObjectId, getBookingById);
router.post("/", validateBookingData, createBooking);
router.delete("/:id", validateObjectId, cancelBooking);
router.get("/manage/:token", getBookingByToken);
router.put("/manage/:token", updateBookingByToken);
router.delete("/manage/:token", cancelBookingByToken);

export default router;
