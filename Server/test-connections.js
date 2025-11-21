import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("Testing MongoDB connection...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Found" : "❌ Missing");

if (process.env.MONGO_URI) {
  console.log("URI (masked):", process.env.MONGO_URI.substring(0, 30) + "...");

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ Connected successfully!");
      console.log("Database name:", mongoose.connection.name);
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Connection failed:", error.message);
      process.exit(1);
    });
} else {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}
