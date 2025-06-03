require("dotenv").config();
const mongoose = require("mongoose");
const AnalyticService = require("../services/analytic.service");
const logger = require("../config/logger");

const dbUri = process.env.MONGO_URI;

async function runFlushJob() {
  try {
    await mongoose.connect(dbUri);
    logger.info("✅ Connected to MongoDB");
    await AnalyticService.flushCountsToDB();
    logger.info("✅ Analytics flushed to DB");
    process.exit(0);
  } catch (err) {
    logger.error("❌ Error running flush job:", err);
    process.exit(1);
  }
}

runFlushJob();

