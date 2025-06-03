const GetShortUrlService = require("../services/getShortUrl.service");
exports.getTinyUrl = async (req, res) => {
  let { shortUrl } = req.params;
  try {
    let response = await GetShortUrlService.get(shortUrl);
    res.status(302).redirect(response.url);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Try again later!" });
  }
};
