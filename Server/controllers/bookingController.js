import * as bookingService from "../services/bookingService.js";
import * as availabilityService from "../services/availabilityService.js";
import convertMinutesToHours from "../utils/convertMinutesToHours.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createBooking(bookingData);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error in creating booking", error);

    if (error.statusCode === 409) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// Get All bookings
export const getAllBooking = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();

    return res.status(200).json({
      success: true,
      bookings: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingService.getBookingById(id);

    return res.status(200).json({
      success: true,
      booking: booking,
    });
  } catch (error) {
    console.error("Error in getBookingById controller", error.message);

    if (error.message === "Booking not found") {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (error.message === "Invalid booking ID format") {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    // 🔧 FIX: Changed res.params to req.params
    const { id } = req.params;

    const cancelledBooking = await bookingService.cancelBooking(id);

    return res.status(200).json({
      success: true,
      message: "Booking was cancelled",
      booking: cancelledBooking,
    });
  } catch (error) {
    console.error("Error in cancelBooking controller", error.message);

    if (error.message === "Invalid booking ID format") {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }

    if (error.message === "Booking not found") {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};

// Get Available Slots
export const getAvailableSlots = async (req, res) => {
  try {
    // 🔧 FIX: Removed extra destructuring
    const { date, serviceDuration } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Convert service duration to hours
    const durationHours = serviceDuration
      ? convertMinutesToHours(serviceDuration)
      : 1;

    console.log("Fetching slots for:", {
      date,
      serviceDuration,
      durationHours,
    });

    // 🔧 FIX: Added () to actually call the function
    const result = await availabilityService.getAvailableSlots(
      date,
      durationHours
    );

    return res.status(200).json({
      success: true,
      date,
      slots: result,
    });
  } catch (error) {
    console.error("Error in getAvailableSlots controller", error.message);

    if (error.message === "Invalid date format") {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error getting available slots",
      error: error.message,
    });
  }
};

// Get booking by token
export const getBookingByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const booking = await bookingService.getBookingByToken(token);

    return res.status(200).json({
      success: true,
      booking: booking,
    });
  } catch (error) {
    console.error("Error in getBookingById controller", error.message);

    if (error.message === "Invalid link") {
      return res.status(400).json({
        success: false,
        message: "Invalid link",
      });
    }

    if (error.message === "Appointment has been cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment has been cancelled",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};
// Update Booking by token

export const updateBookingByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const newData = req.body;
    const updatedBooking = await bookingService.updateBookingByToken(
      token,
      newData
    );
    return res.status(200).json({
      success: true,
      booking: updatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

//Cancel booking by token

export const cancelBookingByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const cancelledBooking = await bookingService.cancelBookingByToken(token);

    return res.status(200).json({
      success: true,
      message: "Booking was cancelled",
      booking: cancelledBooking,
    });
  } catch (error) {
    if (error.message === "no booking was found") {
      return res.status(400).json({
        success: false,
        message: "no booking was found",
      });
    }
    console.error("Error in cancelBookingByToken service", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};
