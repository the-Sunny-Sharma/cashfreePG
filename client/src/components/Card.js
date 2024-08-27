import React from "react";

export default function Card({
  ImgSrc,
  amount,
  product_name,
  product_id,
  checkoutHandler,
}) {
  return (
    <div className="bg-white p-5 mr-auto">
      <img src={ImgSrc} alt={product_name} />
      <p className="text-3xl">{product_name}</p>
      <p>Amount: {amount}</p>
      <button
        onClick={() => checkoutHandler(amount, product_id)}
        className="bg-green-400"
      >
        BUY NOW
      </button>
    </div>
  );
}
