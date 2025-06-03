require("dotenv").config();
const logger = require('./logger');
const { createClient } = require("redis");


const redisClientAnaltics = createClient({
  url: process.env.REDIS_URL_ANALYTICS,
});

redisClientAnaltics.on("error", (err) => logger.error("❌ Redis Client Error for analytics", err));
redisClientAnaltics.connect("success", logger.info("✅ Analytics Redis-service connected successfully"));

module.exports = redisClientAnaltics;
