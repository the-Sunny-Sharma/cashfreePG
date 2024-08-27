import axios from "axios";
import { generateOrderID } from "../app.js";
import { Cashfree } from "cashfree-pg";

export const checkout = async (req, res) => {
  const { amount, customer_id, customer_phone, customer_name, customer_email } =
    req.body;
  // console.log(req.data);
  console.log(`Amount: ${amount} cutomer_id: ${customer_id}`);
  try {
    let request = {
      order_amount: amount,
      order_currency: "INR",
      order_id: await generateOrderID(),
      customer_details: {
        customer_id: customer_id,
        customer_phone: customer_phone,
        customer_name: customer_name,
        customer_email: customer_email,
      },
    };
    // console.log(order_id);

    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        console.log("Checkout REsponse : ", response);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
