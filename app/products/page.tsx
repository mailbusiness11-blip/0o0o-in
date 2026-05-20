"use client";

import { useEffect, useState } from "react";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  url: string;
  category?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  // Fetch Products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Fixed Categories
  const categories = [
    "All",
    "Electronics",
    "Fashion and Apparel",
    "Grocery and Essentials",
    "Beauty and Personal Care",
    "Health and Wellness",
    "Pet Care",
    "Niche Fashion and Lifestyle",
  ];

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading products...
      </div>
    );

  if (products.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No products found
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-5">
          Fashion Store
        </h1>

        {/* Search */}
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-white text-black border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            </a>

            {/* Content */}
            <div className="p-3">
              <h2 className="font-semibold text-sm md:text-base line-clamp-2 min-h-[40px]">
                {product.name}
              </h2>
              <p className="text-green-600 font-bold text-lg mt-1">
                ₹{product.price}
              </p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2 min-h-[32px]">
                {product.description}
              </p>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 bg-black text-white text-center py-2 rounded-xl text-sm hover:bg-gray-800 transition"
              >
                View Product
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-white border rounded-xl disabled:opacity-40"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-xl ${
                currentPage === page ? "bg-black text-white" : "bg-white border"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-white border rounded-xl disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}