const { Worker } = require("bullmq");
const connection = require("../config/redis");
const failedQueue = require("../queue/failedQueue");
const { fraudQueue } = require("../queue/queue");
// const Claim = require("../models/Claim"); // Commented out to prevent Mongo crash if disconnected

const worker = new Worker(
  "eventQueue",
  async (job) => {
    if (global.io) global.io.emit("log", `[WORKER 1: Event] Processing Trigger: ${job.name} (Risk: ${job.data.riskProbability})`);
    
    // Simulate Claim Creation in MongoDB
    // await Claim.create({ workerId: job.data.workerId, status: "DRAFT", data: job.data });
    
    // Delay for dramatic effect in UI demo
    await new Promise(r => setTimeout(r, 1500));

    if (global.io) global.io.emit("log", `[WORKER 1: Event] Claim Drafted. Offloading to Fraud Queue for vetting.`);
    
    // Route to next pipeline queue
    await fraudQueue.add("FRAUD_CHECK", { ...job.data, claimId: `CLM-${Date.now()}` });
  },
  { connection }
);

worker.on("failed", async (job, err) => {
  if (global.io) global.io.emit("log", `❌ [WORKER 1: Event] Failed: ${err.message}`);
  await failedQueue.add("FAILED_JOB", { jobName: job.name, error: err.message });
});

module.exports = worker;