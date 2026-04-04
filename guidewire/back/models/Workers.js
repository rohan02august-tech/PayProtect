// models/Worker.js
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  city: String,
  platform: String,
  workingHours: [Number],
  avgIncome: Number,
  trustScore: { type: Number, default: 50 }
});

module.exports = mongoose.model("Worker", workerSchema);