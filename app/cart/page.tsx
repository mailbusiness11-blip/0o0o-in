"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
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

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-xl flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-lg">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-bold">
              Total: ₹{total}
            </h2>

            <button className="mt-4 bg-black text-white px-6 py-3 rounded-xl">
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}