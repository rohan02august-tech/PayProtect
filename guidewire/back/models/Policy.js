const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  coverageAmount: Number,
  premium: Number,
  active: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Policy", policySchema);