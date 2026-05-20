"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProducts() {

      try {

        const response = await fetch("/api/products");

        const data = await response.json();

        console.log(data);

        if (data.products) {
          setProducts(data.products);
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    fetchProducts();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading Products...
      </div>

    );

  }

  return (

    <main className="min-h-screen bg-gray-100 p-5">

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full z-50 shadow-xl">
        0o0o India • Coming Soon
      </div>

      {/* Header */}
      <div className="text-center mb-10">

        <h1 className="text-4xl md:text-6xl font-extrabold">
          0o0o India
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          India’s Cheapest Multi-Category Ecommerce Marketplace
        </p>

      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold text-lg line-clamp-2">
                {product.name}
              </h2>

              <p className="text-green-600 font-bold text-xl mt-2">
                ₹{product.price}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {product.category}
              </p>

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}