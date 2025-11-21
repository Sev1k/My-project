import Booking from "../models/Booking.js";
import calculateRequiredTimeSlots from "../utils/calculateRequiredTimeSlots.js";

export const isTimeSlotAvailable = async (date, time, durationHours = 1) => {
  try {
    const appointmentDate = new Date(date);

    if (isNaN(appointmentDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const requiredSlots = calculateRequiredTimeSlots(time, durationHours);

    let conflictingBookings = [];

    try {
      conflictingBookings = await Booking.find({
        "appointment.date": appointmentDate,
        "appointment.occupiedTimeSlots": { $in: requiredSlots },
        status: { $nin: ["cancelled"] },
      });

      console.log(
        "Found conflicts with occupiedTimeSlots:",
        conflictingBookings.length
      );

      // Old formatt
      const oldFormatConflicts =
        (await Booking.find({
          "appointment.date": appointmentDate,
          "appointment.time": { $in: requiredSlots },
          "appointment.occupiedTimeSlots": { $exists: false },
          status: { $nin: ["cancelled"] },
        })) || [];

      console.log(
        "Found conflicts with old format:",
        oldFormatConflicts.length
      );
      conflictingBookings = [...conflictingBookings, ...oldFormatConflicts];
    } catch (queryError) {
      console.error("Database query error:", queryError);
      return false;
    }

    console.log("Total conflicting bookings:", conflictingBookings.length);
    return conflictingBookings.length === 0;
  } catch (error) {
    console.error("Error checking time slot", error);
    throw error;
  }
};

// Helper function
export const formatTimeSlot = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const formattedHour = displayHour.toString().padStart(2, "0");
  return `${formattedHour}:00 ${period}`;
};

// Get available time slots for a given date
export const getAvailableSlots = async (date, durationHours = 1) => {
  try {
    const appointmentDate = new Date(date);
    const allTimeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17]; //  available hours
    const availableSlots = [];

    // Get all bookings for this date
    const bookings = await Booking.find({
      "appointment.date": appointmentDate,
      status: { $nin: ["cancelled"] },
    });

    // Extract all booked time slots
    const bookedSlots = new Set();
    bookings.forEach((booking) => {
      if (booking.appointment.occupiedTimeSlots) {
        booking.appointment.occupiedTimeSlots.forEach((slot) =>
          bookedSlots.add(slot)
        );
      } else {
        // Fallback for old bookings without occupiedTimeSlots
        bookedSlots.add(booking.appointment.time);
      }
    });

    // Check each potential start time
    for (const startTime of allTimeSlots) {
      const requiredSlots = calculateRequiredTimeSlots(
        startTime,
        durationHours
      );

      // Check if all required consecutive slots are available
      const allSlotsAvailable = requiredSlots.every(
        (slot) => !bookedSlots.has(slot) && allTimeSlots.includes(slot)
      );

      if (allSlotsAvailable) {
        availableSlots.push(formatTimeSlot(startTime));
      }
    }

    return availableSlots;
  } catch (error) {
    console.error("Error getting available time slots", error);
    throw error;
  }
};
