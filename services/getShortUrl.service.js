const URL = require("../models/url.model");

class GetShortUrlServive {
  static async get(shortUrl) {
    try {
      let response = await URL.findOne({short_url: shortUrl});
      return response;
    } catch (err) {
      return err;
    }
  }
}


module.exports = GetShortUrlServive