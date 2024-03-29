const errorMsg = require("../messages/errors/error.json");

const getQRCode = async (req, res) => {
  //http://localhost:8000/payment/getQRCode
  try {
    const { domainName, walletAddress, amount, userId } = req.body;

    if (!domainName || !walletAddress || !amount || !userId) {
      return res.status(400).json(errorMsg.EBO_007);
    }

    const recipient = new PublicKey(walletAddress);
    const bigAmount = new BigNumber(amount);
    const memo = `Thank you for purchasing this domain. [${domainName}]`;
    const label = `The buyer: ${userId}`;
    // const splToken = new PublicKey("HBZqrepL1G7CeNxnKtZh9QTWYwYUaFMjgezTdN3Lt6DU");

    const reference = new Keypair().publicKey;
    const message = `Thank you for purchasing this domain: [${domainName}]`;
    const urlData = await generateUrl(
      recipient,
      bigAmount,
      reference,
      label,
      message,
      memo
    );

    const ref = reference.toBase58();
    paymentRequests.set(ref, { recipient, bigAmount, memo });
    const { url } = urlData;
    return res.status(200).json({ url: url.toString(), ref });
  } catch (err) {
    console.log("ERROR::: ", err);
    return res.status(500).json(errorMsg.EBO_002);
  }
};

const verifyTransaction = async (req, res) => {
  // http://localhost:8000/payment/verify-transaction
  const { reference } = req.body;

  if (!reference)
    return res
      .status(400)
      .json({ success: false, message: "Missing reference query parameter" });

  try {
    const referencePublicKey = new PublicKey(reference);
    const response = await verifyTransaction(referencePublicKey);
    if (response) {
      return res.status(200).json({
        status: "Transaction verified",
        success: true,
        signature: response.transaction.signatures[0],
      });
    } else {
      return res.status(404).json({
        status: "Transaction not found",
        success: false,
      });
    }
  } catch (err) {
    console.log("ERROR:::", err);
    return res.status(500).json(errorMsg.EBO_002);
  }
};

module.exports = {
  getQRCode,
  verifyTransaction,
};
