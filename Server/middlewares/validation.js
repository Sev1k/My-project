export const validateBookingData = (req, res, next) => {
  const { customerInfo, service, appointment } = req.body;

  const errors = [];

  if (!customerInfo) {
    errors.push({
      field: "customerInfo",
      message: "Customer information is required",
    });
  } else {
    // Check fullName
    if (!customerInfo.fullName || customerInfo.fullName.trim() === "") {
      errors.push({
        field: "customerInfo.fullName",
        message: "Full name is required",
      });
    } else if (customerInfo.fullName.trim().length < 2) {
      errors.push({
        field: "customerInfo.fullName",
        message: "Full name must be at least 2 characters",
      });
    } else if (customerInfo.fullName.trim().length > 100) {
      errors.push({
        field: "customerInfo.fullName",
        message: "Full name cannot exceed 100 characters",
      });
    }

    // Check email
    if (!customerInfo.email || customerInfo.email.trim() === "") {
      errors.push({
        field: "customerInfo.email",
        message: "Email is required",
      });
    } else {
      // Validate email format using regex
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(customerInfo.email)) {
        errors.push({
          field: "customerInfo.email",
          message: "Please provide a valid email address",
        });
      }
    }
  }

  if (!service) {
    errors.push({
      field: "service",
      message: "Service information is required",
    });
  } else {
    // Check serviceId
    if (!service.serviceId) {
      errors.push({
        field: "service.serviceId",
        message: "Service ID is required",
      });
    } else if (typeof service.serviceId !== "number") {
      errors.push({
        field: "service.serviceId",
        message: "Service ID must be a number",
      });
    } else if (service.serviceId < 1 || service.serviceId > 10) {
      errors.push({
        field: "service.serviceId",
        message: "Service ID must be between 1 and 10",
      });
    }

    // Check serviceName
    if (!service.serviceName || service.serviceName.trim() === "") {
      errors.push({
        field: "service.serviceName",
        message: "Service name is required",
      });
    }

    // Check servicePrice
    if (service.servicePrice === undefined || service.servicePrice === null) {
      errors.push({
        field: "service.servicePrice",
        message: "Service price is required",
      });
    } else if (typeof service.servicePrice !== "number") {
      errors.push({
        field: "service.servicePrice",
        message: "Service price must be a number",
      });
    } else if (service.servicePrice < 0) {
      errors.push({
        field: "service.servicePrice",
        message: "Service price cannot be negative",
      });
    } else if (service.servicePrice > 500) {
      errors.push({
        field: "service.servicePrice",
        message: "Service price cannot exceed $500",
      });
    }

    // Check serviceDuration
    if (!service.serviceDuration || service.serviceDuration.trim() === "") {
      errors.push({
        field: "service.serviceDuration",
        message: "Service duration is required",
      });
    }
  }

  if (!appointment) {
    errors.push({
      field: "appointment",
      message: "Appointment information is required",
    });
  } else {
    // Check date
    if (!appointment.date) {
      errors.push({
        field: "appointment.date",
        message: "Appointment date is required",
      });
    } else {
      // Validate date format and value
      const appointmentDate = new Date(appointment.date);

      // Check if valid date
      if (isNaN(appointmentDate.getTime())) {
        errors.push({
          field: "appointment.date",
          message: "Invalid date format. Use YYYY-MM-DD",
        });
      } else {
        // Check if date is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset to start of day

        if (appointmentDate < today) {
          errors.push({
            field: "appointment.date",
            message: "Appointment date cannot be in the past",
          });
        }

        // Check if date is not too far in future (optional - 1 year max)
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        if (appointmentDate > oneYearFromNow) {
          errors.push({
            field: "appointment.date",
            message: "Appointment date cannot be more than 1 year in advance",
          });
        }
      }
    }

    // Check time
    if (!appointment.time || appointment.time.trim() === "") {
      errors.push({
        field: "appointment.time",
        message: "Appointment time is required",
      });
    } else {
      // Validate time format (HH:MM AM/PM)
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
      if (!timeRegex.test(appointment.time)) {
        errors.push({
          field: "appointment.time",
          message: "Invalid time format. Use HH:MM AM/PM (e.g., 02:00 PM)",
        });
      }
    }
  }

  if (errors.length > 0) {
    // Validation failed - send error response and STOP here
    console.log("❌ Validation failed:", errors.length, "errors found");
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  console.log("✅ Validation passed - proceeding to controller");
  next();
};

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  if (!objectIdRegex.test(id)) {
    console.log("❌ Invalid ObjectId format:", id);
    return res.status(400).json({
      success: false,
      message: "Invalid booking ID format",
    });
  }

  console.log("✅ Valid ObjectId format");
  next();
};

export const validateGetBookingsQuery = (req, res, next) => {
  const { status, date } = req.query;

  const errors = [];

  if (status) {
    const validStatuses = [
      "pending",
      "confirmed",
      "cancelled",
      "completed",
      "no-show",
    ];
    if (!validStatuses.includes(status)) {
      errors.push({
        field: "status",
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }
  }

  if (date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      errors.push({
        field: "date",
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid query parameters",
      errors: errors,
    });
  }

  next();
};
