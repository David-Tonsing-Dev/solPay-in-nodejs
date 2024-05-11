const { generateApiKey } = require("generate-api-key");
const ApiKey = require("../models/apiKeyModel");

const newAPIKey = generateApiKey({
  method: "bytes",
  length: 64,
  prefix: "ebos_key",
});

const insertApiKeySeed = async () => {
  const isApiKeyExist = await ApiKey.find();

  if (isApiKeyExist.length > 0) {
    console.log("Apikey already exist!");
  } else {
    await ApiKey.deleteMany({});
    await ApiKey.insertMany([
      {
        apiKey: newAPIKey,
      },
    ]);

    console.log("Apikey recorded successfully!");
  }
};

module.exports = insertApiKeySeed;
