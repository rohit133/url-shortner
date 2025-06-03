require("dotenv").config();
const express = require("express");
const mongooes = require("mongoose");
const routes = require("./routes/index");
const logger = require("./config/logger");
const requestLogger = require("./middleware/requestLogger");
const AnalyticService = require("./services/analytic.service");

const app = express();
const PORT = process.env.PORT;
const dbUri = process.env.MONGO_URI;

app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res) => {
  logger.info("Health check endpoint hit");
  res.status(200).json({ status: "ok" });
});

app.use("/api", routes);

// *****************************************************
// *             *** ONLY FOR TESTING ***              *
// *****************************************************

setInterval(() => {
  try {
    logger.info("Running scheduled analytics flush job");
    AnalyticService.flushCountsToDB();
  } catch (err) {
    logger.error("❌ Error running flush job:", err);
  }
}, 50000);

// *****************************************************
// *             *** ONLY FOR TESTING ***              *
// *****************************************************

mongooes
  .connect(dbUri)
  .then(() => {
    logger.info("✅ dbconnection established successfully");
    app.listen(8080, (error) => {
      if (!error) {
        logger.info(`✅ App listening to port :${PORT || 8080}`);
      } else {
        logger.error(`Error while starting the app ${error}`);
      }
    });
  })
  .catch((error) => logger.error(`❌ dbconnection failed \n${error}`));
