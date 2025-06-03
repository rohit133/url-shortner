require("dotenv").config();
const logger = require('./logger');
const { createClient } = require("redis");

const redisClientUrl = createClient({
  url: process.env.REDIS_URL_CACHE,
});

redisClientUrl.on("error", (err) =>  logger.error(`❌ Redis Client Error for url-service, ${err}`));
redisClientUrl.connect("success",  logger.info(`✅ URL Redis-service connected successfully`));

module.exports = redisClientUrl;
