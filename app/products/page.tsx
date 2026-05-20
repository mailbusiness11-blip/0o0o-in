"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Products</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "12px" }}>
            {product.image ? (
              <img src={product.image} alt={product.title} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
            ) : (
              <div style={{ height: "220px", background: "#ddd" }}>No Image</div>
            )}

            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}