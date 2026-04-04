const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000 // fast timeout for demo
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("⚠️ MongoDB connection failed. Skipping DB queries.");
    // process.exit(1); // Do not crash
  }
};

module.exports = connectDB;