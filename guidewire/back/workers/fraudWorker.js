const { Worker } = require("bullmq");
const connection = require("../config/redis");
const failedQueue = require("../queue/failedQueue");
const { payoutQueue } = require("../queue/queue");

const worker = new Worker(
  "fraudQueue",
  async (job) => {
    if (global.io) global.io.emit("log", `[WORKER 2: Fraud] Vetting Claim ${job.data.claimId} (Worker: ${job.data.workerId || 'Raju'})`);
    
    // Simulate Intelligent Fraud Detection steps
    await new Promise(r => setTimeout(r, 600));
    if (global.io) global.io.emit("log", `[WORKER 2: Fraud] 🛡️ Location and activity validated against Zomato Platform APIs.`);
    
    await new Promise(r => setTimeout(r, 600));
    if (global.io) global.io.emit("log", `[WORKER 2: Fraud] 🛡️ No duplicate claims found for this shift in Redis cache.`);

    await new Promise(r => setTimeout(r, 600));

    // Mock Anomaly Detection Engine
    if (job.data.rainfall > 300) throw new Error("Anomalous Weather Data Detected! Claim Flagged.");
    
    if (global.io) global.io.emit("log", `[WORKER 2: Fraud] ✅ Claim Vetted & Verified. Offloading to Payout Engine.`);
    
    await payoutQueue.add("EXECUTE_PAYOUT", { ...job.data, amount: 500 });
  },
  { connection }
);

worker.on("failed", async (job, err) => {
  if (global.io) global.io.emit("log", `❌ [WORKER 2: Fraud] Rejected Claim ${job.data.claimId}: ${err.message}`);
  await failedQueue.add("FAILED_JOB", { jobName: job.name, error: err.message });
});

module.exports = worker;