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
      let urlObj = await URL.create({
        url: url,
        short_url: shortUrl,
      });
      let response = await urlObj.save();
      console.log(`Testing the Url shortener in the services : ${response}`);
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = CreateShortUrlService;
