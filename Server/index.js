import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes normally (NO dynamic import bugs)
import bookingRoutes from "./routes/bookings.js";

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// 🚀 Register routes BEFORE DB connects
app.use("/bookings", bookingRoutes);

// Start server + connect DB
const startServer = async () => {
  try {
    await connectDB();
    console.log("🔌 Database connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
