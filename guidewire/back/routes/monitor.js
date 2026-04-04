const express = require("express");
const router = express.Router();
const failedQueue = require("../queue/failedQueue");

router.get("/failed", async (req, res) => {
  const jobs = await failedQueue.getJobs(["waiting", "failed"]);

  const result = jobs.map((job) => ({
    id: job.id,
    name: job.name,
    data: job.data,
  }));

  res.json(result);
});

module.exports = router;