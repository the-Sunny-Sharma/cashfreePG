import { Cashfree } from "cashfree-pg";

export const verifyPayment = async (req, res) => {
  try {
    let { orderID } = req.body;

    Cashfree.PGOrderFetchPayments("2023-08-01", orderID)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
