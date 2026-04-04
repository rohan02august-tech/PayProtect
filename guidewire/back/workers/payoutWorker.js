const { Worker } = require("bullmq");
const connection = require("../config/redis");
const failedQueue = require("../queue/failedQueue");
// const Claim = require("../models/Claim");

const worker = new Worker(
  "payoutQueue",
  async (job) => {
    if (global.io) global.io.emit("log", `[WORKER 3: Payout] Executing Smart Contract for ${job.data.claimId}`);
    
    // Simulate Razorpay / UPI API processing delay
    await new Promise(r => setTimeout(r, 2000));

    const razorpayTxnId = `pay_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Simulate final MongoDB persistence
    // await Claim.findOneAndUpdate({ _id: job.data.claimId }, { status: "PAID", transactionId: razorpayTxnId });
    
    if (global.io) global.io.emit("log", `[WORKER 3: Payout] 💰 SUCCESS! ₹${job.data.amount} Disbursed via UPI. (TXN: ${razorpayTxnId})`);
  },
  { connection }
);

worker.on("failed", async (job, err) => {
  if (global.io) global.io.emit("log", `❌ [WORKER 3: Payout] Failure executing UPI Transfer: ${err.message}`);
  await failedQueue.add("FAILED_JOB", { jobName: job.name, error: err.message });
});

module.exports = worker;