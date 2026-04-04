const { publishEvent } = require("./eventBus");

const fireTrigger = async () => {
  const event = {
    type: "RAIN",
    city: "Mumbai",
    intensity: 60,
    timestamp: Date.now()
  };

  await publishEvent("TRIGGER_EVENT", event);
};

module.exports = { fireTrigger };