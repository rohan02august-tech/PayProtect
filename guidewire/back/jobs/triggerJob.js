// jobs/triggerJob.js
const queue = require("../queue/queue");

setInterval(async () => {
  const rain = Math.random() * 100;

  if (rain > 50) {
    console.log("🌧 Rain Event");

    await queue.add("trigger", {
      type: "rainfall",
      city: "mumbai"
    });
  }
}, 10000);