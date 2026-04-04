const Redis = require("ioredis");

const pub = new Redis();
const sub = new Redis();

const publishEvent = async (channel, data) => {
  await pub.publish(channel, JSON.stringify(data));
};

const subscribeEvent = (channel, callback) => {
  sub.subscribe(channel);
  sub.on("message", (chan, message) => {
    if (chan === channel) {
      callback(JSON.parse(message));
    }
  });
};

module.exports = { publishEvent, subscribeEvent };