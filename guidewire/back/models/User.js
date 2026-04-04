const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String },
  phone: String,
  city: String,
  platform: String,
  earningsPerHour: Number,
  activeHours: [Number]
});

module.exports = mongoose.model("User", userSchema);