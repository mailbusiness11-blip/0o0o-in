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
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  useEffect(() => {
    let filtered = [...products];
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = ["All", "Ladies Dresses", "Gadgets", "Kitchen Tools"]; // add your categories

  if (loading) {
    return <p className="p-10 text-xl">Loading products...</p>;
  }

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Products</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <span className="mr-2 font-semibold">Filter by Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 mr-2 rounded ${
              selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product._id} className="bg-white shadow rounded-lg p-4 flex flex-col">
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </a>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">{product.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}