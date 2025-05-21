const mongooes = require("mongoose");

const UrlSchema = mongooes.Schema(
  {
    url: { type: String, required: true },
    short_url: { type: String, required: true, unique: true, index: true   },
    used_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongooes.model("Urls", UrlSchema);
