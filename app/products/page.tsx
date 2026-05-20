"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {

    async function loadProducts() {

      try {

        const res = await fetch("/api/products");

        const data = await res.json();

        console.log(data);

        setProducts(data.products || []);

      } catch (error) {

        console.log(error);

      }

    }

    loadProducts();

  }, []);

  return (

    <main className="min-h-screen bg-gray-100 p-5">

      <h1 className="text-4xl font-bold text-center mb-8">
        0o0o India
      </h1>

      {products.length === 0 ? (

        <div className="text-center text-2xl">
          Loading Products...
        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold">
                  {product.name}
                </h2>

                <p className="text-green-600 font-bold mt-2">
                  ₹{product.price}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  {product.category}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>

  );
}