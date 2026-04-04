const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  eventType: String,
  payout: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Claim", claimSchema);