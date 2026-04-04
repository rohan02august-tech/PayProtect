const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { eventQueue, fraudQueue, payoutQueue } = require("./queue/queue");
const failedQueue = require("./queue/failedQueue");

createBullBoard({
  queues: [
    new BullMQAdapter(eventQueue),
    new BullMQAdapter(fraudQueue),
    new BullMQAdapter(payoutQueue),
    new BullMQAdapter(failedQueue),
  ],
  serverAdapter,
});

module.exports = serverAdapter;