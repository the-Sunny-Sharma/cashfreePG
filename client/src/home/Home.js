import React, { useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const products = [
  {
    img: "https://a.media-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/July/BTF/Aug16/PCQC_New_sports_low._SY116_CB567099711_.jpg",
    id: "RX1253",
    name: "Product 1",
    amount: 150.5,
  },
  {
    img: "https://a.media-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/July/BTF/Aug16/pcqc_shoes_low._SY116_CB567044453_.jpg",
    id: "RX1235",
    name: "Product 2",
    amount: 450.5,
  },
  {
    img: "https://a.media-amazon.com/images/I/71m9z3Evi0L._AC_SY195_.jpg",
    id: "RX12253",
    name: "Product 3",
    amount: 15.5,
  },
  {
    img: "https://a.media-amazon.com/images/G/31/img22/WLA/2023/MSOREFRESHDESKTOP/D87165616_IN_WLA_BAU_MSO_REFRESH-desktop-version_PC_QuadCard_186X116_1X1._SY116_CB602731451_.jpg",
    id: "RX12335",
    name: "Product 4",
    amount: 499,
  },
];
export default function Home() {
  let cashfree;
  let initialzeSDK = async function () {
    try {
      cashfree = await load({
        mode: "sandbox",
      });
      console.log("Cashfree SDK Loaded");
    } catch (error) {
      console.error("Failed to load Cashfree SDK:", error);
    }
  };

  initialzeSDK();

  const [orderID, setOrderID] = useState("");

  const getSessionID = async (amount) => {
    try {
      let res = await axios.post("http://localhost:4000/api/payment", {
        amount,
        customer_id: "webcodder01",
        customer_phone: "9999999999",
        customer_name: "Web Codder",
        customer_email: "webcodder@example.com",
      });

      if (res.data && res.data.payment_session_id) {
        console.log("PAYMENT DATA:", JSON.stringify(res.data)); // Stringify the object for clear logging
        setOrderID(res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (err) {
      console.log(`ERROR in Getting Session ID : ${err}`);
    }
  };

  const verifyPayment = async () => {
    try {
      let res = await axios.post("http://localhost:4000/api/verify", {
        orderID,
      });
      if (res && res.data) {
        alert("payment verified");
      }
    } catch (err) {
      console.log(`ERROR in verifying payment : ${err}`);
    }
  };

  const checkoutHandler = async (amount, productID) => {
    try {
      let sessionID = await getSessionID(amount);

      if (!sessionID) {
        throw new Error("Session ID is undefined");
      }

      let checkoutOptions = {
        paymentSessionId: sessionID,
        redirectTarget: "_modal",
      };
      console.log("Session ID:", sessionID); // Add this line to verify sessionID value

      cashfree
        .checkout(checkoutOptions)
        .then((res) => {
          console.log("Payment initialized:", res);
          verifyPayment(orderID);
        })
        .catch((err) => {
          console.error("Checkout error:", err);
        });
    } catch (err) {
      console.log("Checkout err: ", err);
    }
  };

  return (
    <div className="max-h-screen bg-slate-500">
      <div className="flex flex-row flex-wrap p-10">
        {products.map((product) => (
          <Card
            key={product.id} // It's a good practice to add a unique key when rendering lists
            ImgSrc={product.img}
            product_id={product.id}
            product_name={product.name}
            amount={product.amount}
            checkoutHandler={checkoutHandler}
          />
        ))}
      </div>
    </div>
  );
}
