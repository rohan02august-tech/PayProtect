// controllers/policyController.js
const Policy = require("../models/Policy");

exports.buyPolicy = async (req, res) => {
  const { workerId, coverageAmount } = req.body;

  const premium = Math.round(coverageAmount * 0.01);

  const policy = await Policy.create({
    workerId,
    coverageAmount,
    weeklyPremium: premium,
    triggers: ["rainfall", "aqi"]
  });

  res.json(policy);
};