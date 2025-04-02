import db from "@repo/db/client";
import express from "express";
const app = express();
app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
    status: req.body.status,
  };
  await db.balance.update({
    where: {
      userId: paymentInformation.userId,
    },
    data: {
      amount: {
        increment: paymentInformation.amount,
      },
    },
  });
  await db.onRampTransaction.update({
    where: {
      token: paymentInformation.token,
     },
    data: {
      status: paymentInformation.status,
    },
  })
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
