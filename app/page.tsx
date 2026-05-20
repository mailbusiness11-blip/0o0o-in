"use client";

import { useEffect, useState } from "react";

export default function HomePage() {

  const [products, setProducts] = useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  useEffect(() => {

    async function fetchProducts() {

      try {

        const response =
          await fetch("/api/pinduoduo");

        const data = await response.json();

        console.log(data);

        setProducts(data.products || []);

      } catch (error) {

        console.log(error);

      }

    }

    fetchProducts();

  }, []);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Beauty",
    "Health",
    "Pet Care",
    "Lifestyle",
  ];

  const filteredProducts = products.filter((product) => {

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;

  });

  return (

    <main className="min-h-screen bg-gray-100 p-5">

      {/* COMING SOON */}
      <div className="bg-black text-white text-center py-3 rounded-xl mb-6 text-lg font-bold animate-pulse">
        🚀 Coming Soon — 0o0o India Marketplace
      </div>

      {/* HEADER */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold">
          0o0o India
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          India’s Cheapest Multi-Category Ecommerce Marketplace
        </p>

      </div>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-8">

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="w-full bg-white border rounded-2xl px-5 py-3 outline-none shadow"
        />

      </div>

      {/* CATEGORIES */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Shop By Categories
        </h2>

        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-5 py-3 rounded-2xl shadow font-medium transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white border"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {filteredProducts.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold text-lg">
                {product.name}
              </h2>

              <p className="text-green-600 font-bold text-xl mt-2">
                ₹{product.price}
              </p>

              <p className="text-gray-500 mt-2">
                {product.category}
              </p>

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}