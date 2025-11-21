import Booking from "../models/Booking.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { generateToken } from "../utils/generateToken.js";
import { isTimeSlotAvailable } from "./availabilityService.js";
import convertMinutesToHours from "../utils/convertMinutesToHours.js";
import calculateRequiredTimeSlots from "../utils/calculateRequiredTimeSlots.js";

import emailService from "./emailService.js";

// Get all Bookings

export const getAllBookings = async () => {
  try {
    const allBookings = await Booking.find();

    return allBookings;
  } catch (error) {
    console.log("Error fetching bookings:", error.message);
    throw error;
  }
};

// Get By ID

export const getBookingById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid booking ID format");
    }
    const booking = await Booking.findById(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error) {
    console.log("Error fetching by Id", error.message);
    throw error;
  }
};
// Cancel Booking
export const cancelBooking = async (id, reason) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid booking ID format");
    }
    const booking = await Booking.findById(id);

    if (!booking) {
      throw new Error("Booking not found");
    }
    booking.status = "cancelled";

    try {
      await emailService.sendCancellation(booking);
    } catch (emailError) {
      console.error("Email failed, but booking cancelled:", emailError);
    }

    booking.cancellation = {
      cancelledAt: new Date(),
      cancelledBy: "customer", //  make this a parameter later
      reason: reason, // make this a parameter later
    };

    await booking.save();

    return booking;
  } catch (error) {
    console.log("Couldnt cancel", error);
    throw error;
  }
};

// Create Booking
export const createBooking = async (bookingData) => {
  try {
    const { customerInfo, service, appointment } = bookingData;

    // Validations

    if (!customerInfo?.email || !customerInfo?.fullName) {
      throw new Error("Customer email and full name are required");
    }

    if (
      !service?.serviceId ||
      !service?.serviceName ||
      !service?.servicePrice ||
      !service?.serviceDuration
    ) {
      throw new Error("Service information is required");
    }
    if (!appointment?.date || !appointment?.time) {
      throw new Error("Appointment date and time are required");
    }
    let user = await User.findOne({
      email: customerInfo.email.toLowerCase(),
    });

    if (!user) {
      user = await User.create({
        email: customerInfo.email.toLowerCase(),
        fullName: customerInfo.fullName,
      });
    }

    //
    const durationHours = convertMinutesToHours(service.serviceDuration);

    //
    const occupiedSlots = calculateRequiredTimeSlots(
      appointment.time,
      durationHours
    );

    const appointmentTimeNumber = parseInt(appointment.time);

    // Avaialbility
    const isAvailable = await isTimeSlotAvailable(
      appointment.date,
      appointmentTimeNumber,
      durationHours
    );

    if (!isAvailable) {
      // Let's see what conflicts exist
      const conflicts = await Booking.find({
        "appointment.date": new Date(appointment.date),
        status: { $nin: ["cancelled"] },
      });

      const error = new Error(
        `Time slot ${appointment.time} on ${appointment.date} is already booked`
      );
      error.statusCode = 409; // Conflict status code
      throw error;
    }

    // Generate Token
    const secureToken = generateToken(32);
    // Creation

    const newBooking = await Booking.create({
      manageToken: secureToken,
      userId: user._id,
      customerInfo: {
        fullName: customerInfo.fullName,
        email: customerInfo.email,
      },
      service: {
        serviceId: service.serviceId,
        serviceName: service.serviceName,
        servicePrice: service.servicePrice,
        serviceDuration: service.serviceDuration,
        serviceDurationHours: durationHours,
      },
      status: "confirmed",
      appointment: {
        date: appointment.date,
        time: appointmentTimeNumber,
        endTime: appointmentTimeNumber + durationHours,
        durationHours: durationHours,
        occupiedTimeSlots: occupiedSlots,
      },
    });

    try {
      await emailService.sendConfirmation(newBooking);
    } catch (emailError) {
      console.error("Email failed but booking succeeded:", emailError);
    }

    return newBooking;
  } catch (error) {
    console.log("Error creating booking", error);
    throw error;
  }
};

// Get By Token

export const getBookingByToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Missing manage token");
    }

    const booking = await Booking.findOne({ manageToken: token });

    if (!booking) {
      throw new Error("Invalid link");
    }

    if (booking.status === "cancelled") {
      throw new Error("Appointment has been cancelled");
    }

    return booking;
  } catch (error) {
    throw error;
  }
};

// Update booking by token

export const updateBookingByToken = async (token, newData) => {
  try {
    const booking = await getBookingByToken(token);

    const durationHours = convertMinutesToHours(
      newData.service?.serviceDuration
    );

    const isAvailable = await isTimeSlotAvailable(
      newData.appointment?.date,
      newData.appointment?.time,
      durationHours
    );
    const appointmentTimeNumber = parseInt(newData.appointment.time);
    const occupiedSlots = calculateRequiredTimeSlots(
      newData.appointment.time,
      durationHours
    );

    if (!isAvailable) {
      const error = new Error(
        `Time slot ${appointment.time} on ${appointment.date} is already booked`
      );
      error.statusCode = 409; // Conflict status code
      throw error;
    }

    booking.service = {
      ...newData.service,
      serviceDurationHours: durationHours,
    };

    // Update appointment with all required fields
    booking.appointment = {
      ...newData.appointment,
      time: appointmentTimeNumber, // Store as number
      endTime: appointmentTimeNumber + durationHours,
      durationHours: durationHours,
      occupiedTimeSlots: occupiedSlots,
    };

    await booking.save();

    try {
      await emailService.sendConfirmation(booking);
    } catch (emailError) {
      console.error("Email failed but booking succeeded:", emailError);
    }

    return booking;
  } catch (error) {
    console.error(error.message);
  }
};

// Cancel booking by token
export const cancelBookingByToken = async (token) => {
  try {
    const booking = await getBookingByToken(token);

    booking.status = "cancelled";

    if (!booking) {
      throw new Error("no booking was found");
    }

    try {
      await emailService.sendCancellation(booking);
    } catch (emailError) {
      console.error("Email failed, but booking cancelled:", emailError);
    }

    booking.cancellation = {
      cancelledAt: new Date(),
      cancelledBy: {
        fullName: booking.customerInfo.fullName,
        email: booking.customerInfo.email,
      },
    };

    await booking.save();

    return booking;
  } catch (error) {
    console.log("Couldnt cancel", error);
    throw error;
  }
};
