"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch(
      "/api/products"
    );

    const data =
      await response.json();

    setProducts(data.products);
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          marginBottom: "40px",
        }}
      >
        Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#ddd",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  fontSize: "22px",
                }}
              >
                No Image
              </div>
            )}

            <h2
              style={{
                marginTop: "20px",
                fontSize: "28px",
              }}
            >
              {product.title}
            </h2>

            <p
              style={{
                color: "green",
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {product.price}
            </p>

            <a
              href={`/products/${product._id}`}
              style={{
                display: "block",
                marginTop: "20px",
                padding: "15px",
                background: "black",
                color: "white",
                textAlign: "center",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "18px",
              }}
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}