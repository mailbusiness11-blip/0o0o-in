"use client";

import { useEffect, useState } from "react";

export default function EditPage({
  params,
}: any) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const res = await fetch("/api/products");

    const data = await res.json();

    const product = data.products.find(
      (p: any) => p._id === params.id
    );

    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImage(product.image);
    }
  }

  async function updateProduct() {
    const response = await fetch(
      `/api/products/${params.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          price,
          image,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Product Updated");
    }
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "40px",
        }}
      >
        Edit Product
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Product Title"
          style={{
            padding: "14px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <input
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="Price"
          style={{
            padding: "14px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <input
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          placeholder="Image URL"
          style={{
            padding: "14px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={updateProduct}
          style={{
            padding: "14px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Product
        </button>

        <a
          href="/admin"
          style={{
            textAlign: "center",
            padding: "14px",
            background: "#eee",
            color: "black",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Back To Admin
        </a>
      </div>
    </div>
  );
}