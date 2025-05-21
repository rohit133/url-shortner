const { createTinyUrl } = require("../controllers/createShortUrl.controller");
const router = require("express").Router();

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is Up ✅" });
});

router.post("/create", createTinyUrl)


module.exports = router;
