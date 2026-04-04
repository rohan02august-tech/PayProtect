const { Queue } = require("bullmq");
const connection = require("../config/redis");

const failedQueue = new Queue("failedQueue", {
  connection,
});

module.exports = failedQueue;