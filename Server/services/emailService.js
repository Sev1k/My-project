import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import {
  confirmationEmail,
  cancellationEmail,
} from "../utils/emailTemplates.js";

class EmailService {
  constructor() {
    // Transporter = Email delivery system configuration
    this.transporter = nodemailer.createTransport({
      service: "gmail", // Tell nodemailer we're using Gmail
      auth: {
        user: process.env.EMAIL_USER, //  Gmail address
        pass: process.env.EMAIL_PASS, //  App Password
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error("❌ Email service error:", error.message);
      } else {
        console.log("✅ Email service is ready to send emails");
      }
    });
  }

  async sendConfirmation(booking) {
    try {
      const htmlContent = confirmationEmail(booking);

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // Who it's from
        to: booking.customerInfo.email, // Who it's going to
        subject: `Booking Confirmed - ${
          process.env.SALON_NAME || "Nail Salon"
        }`, // Email subject line
        html: htmlContent, // The HTML content

        text: `Hi ${booking.customerInfo.fullName}, your appointment for ${booking.service.serviceName} on ${booking.appointment.date} at ${booking.appointment.time} has been confirmed.`,
      };

      // transporter.sendMail() does the actual sending
      const info = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: info.messageId,
        recipient: booking.customerInfo.email,
      };
    } catch (error) {
      console.error("❌ Failed to send confirmation email:", error.message);

      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendCancellation(booking) {
    try {
      // Generate cancellation email HTML
      const htmlContent = cancellationEmail(booking);

      // Create email options
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: booking.customerInfo.email,
        subject: `Booking Cancelled - ${
          process.env.SALON_NAME || "Nail Salon"
        }`,
        html: htmlContent,
        text: `Hi ${booking.customerInfo.fullName}, your appointment for ${booking.service.serviceName} on ${booking.appointment.date} at ${booking.appointment.time} has been cancelled.`,
      };

      // Send email
      const info = await this.transporter.sendMail(mailOptions);

      console.log("✅ Cancellation email sent:", info.messageId);

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      console.error("❌ Failed to send cancellation email:", error.message);

      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendTestEmail(recipientEmail) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: recipientEmail,
        subject: "Test Email - Nail Salon Booking System",
        html: `
          <h1>Test Email</h1>
          <p>If you're reading this, your email configuration works! 🎉</p>
          <p>Salon: ${process.env.SALON_NAME}</p>
          <p>From: ${process.env.EMAIL_USER}</p>
        `,
        text: "Test email - your configuration works!",
      };

      const info = await this.transporter.sendMail(mailOptions);

      console.log("✅ Test email sent successfully!");
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Test email failed:", error.message);
      return { success: false, error: error.message };
    }
  }
}

const emailService = new EmailService();

export default emailService;
