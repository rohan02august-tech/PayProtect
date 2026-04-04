const express = require("express");
const router = express.Router();
const Policy = require("../models/Policy");

router.post("/create", async (req, res) => {
  try {
    const policy = await Policy.create(req.body);
    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const policies = await Policy.find();
  res.json(policies);
});

module.exports = router;   // ✅ MUST BE HERE