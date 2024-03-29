const Moralis = require("moralis").default;

const { exchangeAddress } = require("../constant/paymentController");

const connectionWithMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_APIKEY,
  });
  console.log("Connected with Moralis");
};

const convertUSDtoSOL = async (amount) => {
  const response = await Moralis.SolApi.token.getTokenPrice({
    network: process.env.MORALIS_NETWORK,
    address: exchangeAddress,
  });

  console.log(response.raw);

  return amount / response.raw.usdPrice;
};

module.exports = {
  connectionWithMoralis,
  convertUSDtoSOL,
};
