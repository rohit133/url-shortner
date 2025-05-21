const CreateShortUrlServive = require("../services/createShortUrl.service");

exports.createTinyUrl = async (req, res) => {
  let { url } = req.body;
  try {
    let response = await CreateShortUrlServive.create(url);
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error, Try again later!" });
  }
};
