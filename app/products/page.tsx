"use client";

import { useEffect, useState } from "react";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  url: string;
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

  if (loading) {
    return <p className="p-10 text-xl">Loading products...</p>;
  }

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>

      {products.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
    </main>
  );
}