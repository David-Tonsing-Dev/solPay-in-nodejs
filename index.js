require("dotenv").config();
const express = require("express");
const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const { encodeURL, findReference, validateTransfer } = require("@solana/pay");
const BigNumber = require("bignumber.js");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const paymentRequests = new Map();

async function generateUrl(recipient, amount, reference, label, message, memo) {
  const url = encodeURL({
    recipient,
    amount,
    reference,
    label,
    message,
    memo,
  });
  return { url };
}

async function verifyTransaction(reference) {
  const paymentData = paymentRequests.get(reference.toBase58());
  if (!paymentData) {
    throw new Error("Payment request not found");
  }

  const { recipient, bigAmount, memo } = paymentData;
  const connection = new Connection(
    process.env.QUICK_NODE_DEVNET_RPC,
    "confirmed"
  );

  const amount = bigAmount;

  const found = await findReference(connection, reference);

  const response = await validateTransfer(
    connection,
    found.signature,
    { recipient, amount, splToken: undefined, reference },
    { commitment: "confirmed" }
  );

  if (response) {
    paymentRequests.delete(reference.toBase58());
  }
  return response;
}

app.post("/getQRCode", async (req, res) => {
  try {
    const { orderId, walletAddress, amount, userId } = req.body;

    if (!orderId || !walletAddress || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Some fields are missing!",
      });
    }

    const recipient = new PublicKey(walletAddress);
    const bigAmount = new BigNumber(amount);
    const memo = `Thank you for purchasing the product: ${orderId}`;
    const label = `The customer: ${userId}`;
    // const splToken = new PublicKey("HBZqrepL1G7CeNxnKtZh9QTWYwYUaFMjgezTdN3Lt6DU");

    const reference = new Keypair().publicKey;
    const message = `Thank you for purchasing the product: ${orderId}`;
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
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

app.post("/verify", async (req, res) => {
  // http://localhost:8000/verify
  const { reference } = req.body;
  if (!reference)
    return res.status(400).json({ error: "Missing reference query parameter" });

  try {
    const referencePublicKey = new PublicKey(reference);
    const response = await verifyTransaction(referencePublicKey);
    if (response) {
      return res.status(200).json({
        status: "Transaction verified",
        success: true,
        signature: response.transaction.signature[0],
      });
    } else {
      return res
        .status(404)
        .json({ status: "Transaction not found", success: false });
    }
  } catch (err) {
    console.log("ERROR:::", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
