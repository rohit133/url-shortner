const { getTinyUrl } = require("../controllers/getShortUrl.controller");

const router = require("express").Router();

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is Up ✅" });
});

router.get("/:shortUrl", getTinyUrl)


module.exports = router;
