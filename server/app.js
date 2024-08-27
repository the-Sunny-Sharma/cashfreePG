import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";
import crypto from "crypto";

config({ path: "./config/config.env" });

export const app = express();

export function generateOrderID() {
  const uniqueID = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(uniqueID);

  const orderID = hash.digest("hex");
  return orderID.substring(0, 12);
  //   console.log("order ID generted", orderID_r);
  //   return orderID_r;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", paymentRoute);
