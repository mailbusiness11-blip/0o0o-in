"use client";

import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";

export default function ProductsPage() {
  const { cart, addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
          }}
        >
          Ecommerce Store
        </h1>

        <a
          href="/cart"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Cart ({cart.length})
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h2
              style={{
                marginTop: "15px",
              }}
            >
              {product.title}
            </h2>

            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}