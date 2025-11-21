import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    // Customer Information
    customerInfo: {
      fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [100, "Name cannot exceed 100 characters"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      },
    },

    // Service Information
    service: {
      serviceId: {
        type: Number,
        required: [true, "Service ID is required"],
        min: [1, "Service ID must be at least 1"],
        max: [10, "Service ID cannot exceed 10"],
      },
      serviceName: {
        type: String,
        required: [true, "Service name is required"],
        trim: true,
      },
      servicePrice: {
        type: Number,
        required: [true, "Service price is required"],
        min: [0, "Price cannot be negative"],
        max: [500, "Price cannot exceed $500"],
      },
      serviceDuration: {
        type: String,
        required: [true, "Service duration is required"],
        trim: true,
      },
      serviceDurationHours: {
        type: Number,
        required: true,
        min: [0.5, "duration must be at least an hour"],
        max: [3, "duration cannot exceed 3 hours"],
      },
    },

    // Appointment Details
    appointment: {
      date: {
        type: Date,
        required: [true, "Appointment date is required"],
        validate: {
          validator: function (value) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return value >= today;
          },
          message: "Appointment date cannot be in the past",
        },
      },
      time: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Appointment time is required"],
        match: [
          /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
          "Time must be in format: HH:MM AM/PM (e.g., 09:00 AM)",
        ],
      },
      endTime: {
        type: Number,
        required: [true, "Appointment time end is required"],
        match: [
          /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
          "Time must be in format: HH:MM AM/PM (e.g., 09:00 AM)",
        ],
      },
      durationHours: { type: Number, default: 1 },
      occupiedTimeSlots: [Number],
    },

    // Booking Status
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "cancelled", "completed", "no-show"],
        message: "{VALUE} is not a valid status",
      },
      default: "confirmed",
    },

    // Cancellation Information
    cancellation: {
      cancelledAt: {
        type: Date,
      },
      cancelledBy: {
        fullName: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    },

    manageToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for performance
bookingSchema.index({ "appointment.date": 1, "appointment.time": 1 });
bookingSchema.index({ userId: 1, "appointment.date": 1 });
bookingSchema.index({ "customerInfo.email": 1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
