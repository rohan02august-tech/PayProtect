const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Temporary in-memory OTP store (in production use Redis)
const otpStore = {};

const twilio = require('twilio');

// SEND OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ error: "Identifier (phone or email) is required" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store it
    otpStore[identifier] = otp;
    
    console.log(`OTP for ${identifier}: ${otp}`);

    // If identifier doesn't have @, assume it's a phone number. 
    // Format it to add +91 if they didn't provide country code (common in India)
    const isEmail = identifier.includes("@");
    
    // Evaluate env locally within request
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    if (!isEmail && accountSid && authToken) {
      let formattedPhone = identifier;
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+91' + formattedPhone; 
      }
      
      try {
        const twilioClient = twilio(accountSid, authToken);
        await twilioClient.messages.create({
          body: `Your PayProtect verification code is: ${otp}. Valid for 10 minutes.`,
          from: twilioPhone,
          to: formattedPhone
        });
        console.log("SMS successfully sent via Twilio to", formattedPhone);
      } catch (smsErr) {
        console.log("Twilio SMS failed. (Did you verify the recipient phone manually in Twilio Trial?)", smsErr.message);
      }
    } else if (!isEmail) {
      console.log("Twilio credentials missing in .env or not configured, skipping real SMS sending.");
    }

    res.json({ message: "OTP sent successfully", otp }); // returning otp for demo purposes
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VERIFY OTP & LOGIN/REGISTER
router.post("/verify-otp", async (req, res) => {
  try {
    const { identifier, otp, isRegister, password } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ error: "Identifier and OTP are required" });
    }

    if (otpStore[identifier] !== otp && otp !== "123456") { // 123456 as master OTP for demo
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }

    // Clear OTP
    delete otpStore[identifier];

    // Find or create user
    const isEmail = identifier.includes("@");
    const query = isEmail ? { email: identifier } : { phone: identifier };
    
    let user;
    try {
      user = await User.findOne(query);
      if (!user) {
        if (isRegister) {
          user = await User.create({ 
            email: isEmail ? identifier : undefined,
            phone: !isEmail ? identifier : undefined,
            password
          });
        }
      }
    } catch (dbErr) {
      console.log("DB skipped due to connection issue. Mocking success.");
      user = { id: "mock_123", email: identifier, name: "Demo User" };
    }

    if (!user && !isRegister) {
       return res.status(404).json({ error: "User not found. Please register." });
    }

    res.json({ message: "Authentication successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN (Password basic)
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; 
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { phone: identifier }] 
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password && user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Logged in successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
