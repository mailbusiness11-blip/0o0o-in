"use client";

import { useState } from "react";

export default function ImportProductsPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Saving product...");

    const res = await fetch("/api/products/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        image,
        sourceUrl,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Product imported successfully!");
      setTitle("");
      setPrice("");
      setImage("");
      setSourceUrl("");
    } else {
      setMessage(data.error || "Failed to import product");
    }
  }

  return (
    <main style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Import Products</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
        <input
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "12px" }}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: "12px" }}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ padding: "12px" }}
        />

        <input
          placeholder="Source URL"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          style={{ padding: "12px" }}
        />

        <button type="submit" style={{ padding: "12px", cursor: "pointer" }}>
          Import Product
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </main>
  );
}