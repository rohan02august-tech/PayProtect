const { subscribeEvent } = require("./eventBus");
const Claim = require("../models/Claim");

subscribeEvent("FRAUD_VERIFIED", async (data) => {
  console.log("💰 Processing payouts...");

  for (let policy of data.policies) {
    const payout = policy.coverageAmount * 0.5;

    const claim = await Claim.create({
      userId: policy.userId,
      eventType: data.event.type,
      payout,
      status: "PAID"
    });

    console.log(`✅ Paid ₹${payout} | Claim ID: ${claim._id}`);
  }
});