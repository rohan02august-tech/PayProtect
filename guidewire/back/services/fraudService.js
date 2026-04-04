const { subscribeEvent, publishEvent } = require("./eventBus");

subscribeEvent("ELIGIBLE_USERS", async (data) => {
  console.log("Fraud check running...");

  const verified = data.policies; // simple for now

  await publishEvent("FRAUD_VERIFIED", {
    event: data.event,
    policies: verified
  });
});