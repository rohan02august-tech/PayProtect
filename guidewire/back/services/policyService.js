const { subscribeEvent, publishEvent } = require("./eventBus");
const Policy = require("../models/Policy");

subscribeEvent("TRIGGER_EVENT", async (event) => {
  console.log("📜 Checking policies...");

  const policies = await Policy.find({ active: true });

  await publishEvent("ELIGIBLE_USERS", {
    event,
    policies
  });
});