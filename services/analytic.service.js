const URL = require("../models/url.model");
const redisClientAnalytics = require("../config/redis-analytics");

class AnalyticService {
  // Increment the count in Redis for the given shortUrl
  static async updateCount(shortUrl) {
    try {
      const redisKey = `analytics:${shortUrl}`;
      await redisClientAnalytics.incr(redisKey);
    } catch (err) {
      console.error("Error updating analytics count in Redis:", err);
    }
  }

  // Flush all analytics counts from Redis to MongoDB
  static async flushCountsToDB() {
    try {
      // Get all keys matching analytics:*
      const keys = await redisClientAnalytics.keys("analytics:*");
      for (const key of keys) {
        const shortUrl = key.split(":")[1];
        const count = parseInt(await redisClientAnalytics.get(key), 10);
        if (!isNaN(count) && count > 0) {
          // Update the count in MongoDB ('used_count' field)
          await URL.updateOne(
            { short_url: shortUrl },
            { $inc: { used_count: count } }
          );
          // Reset the counter in Redis
          await redisClientAnalytics.del(key);
        }
      }
    } catch (err) {
      console.error("Error flushing analytics counts to DB:", err);
    }
  }
}

module.exports = AnalyticService;
