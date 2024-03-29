const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the User model
module.exports = mongoose.model("User", userSchema);
