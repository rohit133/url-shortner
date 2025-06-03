const redisClientUrl = require("../config/redis-url");
const URL = require("../models/url.model");
const hashfunction = require("js-sha256");

class CreateShortUrlService {
  static async create(url) {
    try {
      let shortUrl, checkIfDuplicate, attempt = 0;
      do {
        shortUrl = hashfunction.sha256(url + attempt).slice(0, 6);
        checkIfDuplicate = await URL.findOne({ short_url: shortUrl });
        attempt++;
      } while (checkIfDuplicate);

      let response = await URL.create({
        url: url,
        short_url: shortUrl,
      });
      return response;
    } catch (err) {
      console.error("Error creating short URL:", err);
      throw new Error("Failed to create short URL");
    }
  }
}

module.exports = CreateShortUrlService;
