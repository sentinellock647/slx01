// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ethers } from "ethers";

export default async function handler(req, res) {
  const { message, signature, address } = req.query;
  try {
    const signedAddr = ethers.utils.verifyMessage(message, signature);

    if (signedAddr !== address) {
      throw new Error("Invalid signature");
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Signature verified",
        address,
        signature,
        signedAddr,
      })
    );
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Signature verification failed",
        error,
      })
    );
  }
}
