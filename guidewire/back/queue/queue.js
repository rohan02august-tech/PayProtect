const { Queue } = require("bullmq");
const connection = require("../config/redis");

const eventQueue = new Queue("eventQueue", { connection });
const fraudQueue = new Queue("fraudQueue", { connection });
const payoutQueue = new Queue("payoutQueue", { connection });

module.exports = { eventQueue, fraudQueue, payoutQueue };