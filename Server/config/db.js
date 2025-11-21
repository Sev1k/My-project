import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if MONGO_URI exists
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is undefined in process.env");
    }

    console.log("🔌 Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    // process.exit(1);
  }
};

export default connectDB;
