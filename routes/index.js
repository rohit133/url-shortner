const router = require("express").Router();

router.use("/url",  require("./create"));
router.use("/url",  require("./get"));



module.exports = router;
