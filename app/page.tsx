"use client";

import { useState } from "react";

export default function HomePage() {

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Beauty",
    "Health",
    "Pet Care",
    "Lifestyle",
  ];

  const allProducts = [

    {
      id: 1,
      name: "Wireless Earbuds",
      price: "₹1999",
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      name: "Elegant Summer Dress",
      price: "₹1499",
      category: "Fashion",
      image:
        "https://img.kwcdn.com/product/fancy/f999168a-0700-4898-ba68-6bc93167cda2.jpg",
    },

    {
      id: 3,
      name: "Luxury Skin Care Set",
      price: "₹1599",
      category: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 4,
      name: "Yoga Mat",
      price: "₹899",
      category: "Health",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 5,
      name: "Dog Bed",
      price: "₹1299",
      category: "Pet Care",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 6,
      name: "Luxury Handbag",
      price: "₹2499",
      category: "Lifestyle",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  const filteredProducts = allProducts.filter((product) => {

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

      {/* TOP COMING SOON */}
      <div className="bg-black text-white text-center py-3 rounded-xl mb-6 text-lg font-bold animate-pulse">
        🚀 Coming Soon — 0o0o India Marketplace
      </div>

      {/* Header */}
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

      {/* CATEGORY FILTERS */}
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
                {product.price}
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