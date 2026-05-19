"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const handlePayment = async () => {
    const res = await fetch(
      "/api/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      }
    );

    const data = await res.json();

    const options = {
      key: process.env
        .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount:
        data.order.amount,

      currency:
        data.order.currency,

      name: "0o0o Store",

      description:
        "Purchase from 0o0o",

      order_id:
        data.order.id,

      handler: function (
        response: any
      ) {
        alert(
          "Payment Successful!"
        );

        localStorage.removeItem(
          "cart"
        );

        window.location.href =
          "/";
      },

      theme: {
        color: "#000000",
      },
    };

    const razorpay =
      new (window as any).Razorpay(
        options
      );

    razorpay.open();
  };

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-8">
        Checkout
      </h1>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl"
          >
            <h2 className="text-2xl font-bold">
              {item.name}
            </h2>

            <p>₹{item.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-4xl font-bold mt-8">
        Total: ₹{total}
      </h2>

      <button
        onClick={handlePayment}
        className="mt-6 bg-black text-white px-8 py-4 rounded-xl"
      >
        Pay Now
      </button>
    </main>
  );
}