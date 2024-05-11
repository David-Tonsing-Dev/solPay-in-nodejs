const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema({
  apiKey: {
    type: String,
    unique: true,
    required: true,
  },
});

const ApiKey = mongoose.model("ApiKey", apiKeySchema);

module.exports = ApiKey;
