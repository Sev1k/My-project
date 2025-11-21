// import dotenv from "dotenv";

// // Load .env
// const result = dotenv.config();

// console.log("=== ENVIRONMENT CHECK ===\n");

// // Check if .env loaded
// if (result.error) {
//   console.error("❌ Error loading .env file:", result.error);
//   console.log("\nMake sure .env file exists in:", process.cwd());
//   process.exit(1);
// } else {
//   console.log("✅ .env file loaded successfully\n");
// }

// // Check each variable
// console.log("Environment Variables:");
// console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ MISSING");
// console.log(
//   "EMAIL_PASS:",
//   process.env.EMAIL_PASS
//     ? `✅ Set (${process.env.EMAIL_PASS.length} characters)`
//     : "❌ MISSING"
// );
// console.log("EMAIL_FROM:", process.env.EMAIL_FROM || "❌ MISSING");

// // Check if credentials exist
// if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//   console.error("\n❌ EMAIL_USER or EMAIL_PASS not set in .env file!");
//   console.log("\nYour .env file should look like:");
//   console.log("EMAIL_USER=your.email@gmail.com");
//   console.log("EMAIL_PASS=your_16_character_app_password");
//   process.exit(1);
// }

// console.log("\n=== ATTEMPTING TO SEND EMAIL ===\n");

// // Import email service
// import emailService from "./services/emailService.js";

// // Send test email
// const testEmail = "miliamirov@gmail.com"; // Send to yourself for testing

// emailService
//   .sendTestEmail(testEmail)
//   .then((result) => {
//     console.log("\n=== RESULT ===");
//     console.log(result);

//     if (result.success) {
//       console.log("\n✅ SUCCESS! Check your inbox:", testEmail);
//     } else {
//       console.log("\n❌ FAILED:", result.error);
//     }

//     process.exit(result.success ? 0 : 1);
//   })
//   .catch((error) => {
//     console.error("\n❌ UNEXPECTED ERROR:", error);
//     process.exit(1);
//   });

import dotenv from "dotenv";
dotenv.config();

import emailService from "./services/emailService.js";

// Mock booking data
const mockBooking = {
  customerInfo: {
    fullName: "Maria Amirov",
    email: "zehavik100@gmail.com", // Your email for testing
  },
  service: {
    serviceName: "Gel Manicure",
    servicePrice: 40,
    serviceDuration: "45 min",
  },
  appointment: {
    date: new Date("2025-12-08"),
    time: "05:00 PM",
  },
};

emailService.sendConfirmation(mockBooking).then((result) => {
  console.log("Confirmation sent:", result);
  process.exit(0);
});
