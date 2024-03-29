const { generateApiKey } = require("generate-api-key");
const User = require("../models/userModel");
const errorMsg = require("../messages/errors/error.json");

const signup = async (req, res) => {
  try {
    const { userId } = req.body;

    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json(errorMsg.EBO_001);
    }

    const newAPIKey = generateApiKey({
      method: "bytes",
      length: 64,
      prefix: "ebos_key",
    });

    await User.create({
      userId,
      apiKey: newAPIKey,
    });

    return res.status(200).json({
      success: true,
      apiKey: newAPIKey,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorMsg.EBO_002);
  }
};

module.exports = {
  signup,
};
