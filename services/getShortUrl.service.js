const URL = require("../models/url.model");
const redisClientUrl = require("../config/redis-url");
const AnalyticService = require("./analytic.service");

class GetShortUrlService {
  static async get(shortUrl) {
    const redisKey = `shorturl:${shortUrl}`;
    try {
      // Check cache
      const cachedUrl = await redisClientUrl.get(redisKey);

      if (cachedUrl) {
        // Fire analytics update
        AnalyticService.updateCount(shortUrl);
        return JSON.parse(cachedUrl);
      }

      // // Fallback to DB
      let response = await URL.findOne({ short_url: shortUrl });
      if (response) {
        await redisClientUrl.set(redisKey, JSON.stringify(response), { EX: 3600 });
        // Fire analytics update
        AnalyticService.updateCount(shortUrl);
      }
      return response;
    } catch (err) {
      console.error("Error fetching short URL:", err);
      throw new Error("Failed to retrieve short URL");
    }
  }
}

module.exports = GetShortUrlService;
