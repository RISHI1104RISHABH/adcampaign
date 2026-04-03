const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  name: String,
  page: String,
  budget: Number,
  status: String,
  user_id: String
});

module.exports = mongoose.model("Campaign", CampaignSchema);