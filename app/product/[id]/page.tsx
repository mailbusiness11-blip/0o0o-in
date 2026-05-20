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

  if (loading) return <p className="p-6 text-xl">Loading products...</p>;
  if (products.length === 0) return <p className="p-6 text-xl">No products found</p>;

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Ladies Dresses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
          >
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 sm:h-52 md:h-56 object-cover"
              />
            </a>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
              <p className="text-green-600 font-bold mb-2">₹{p.price}</p>
              <p className="text-gray-600 text-sm line-clamp-3 flex-1">{p.description}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                View Product
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}