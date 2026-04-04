// models/Payout.js
const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
  workerId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payout", payoutSchema);