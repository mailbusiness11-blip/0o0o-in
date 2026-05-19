"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [image, setImage] =
    useState("");

  async function loadProducts() {
    const res = await fetch(
      "/api/products"
    );

    const data = await res.json();

    setProducts(data.products);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function uploadImage(
    e: any
  ) {
    const file = e.target.files[0];

    const reader =
      new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend =
      async () => {
        const response =
          await fetch(
            "/api/upload",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                image:
                  reader.result,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {
          setImage(data.image);

          alert(
            "Image Uploaded"
          );
        }
      };
  }

  async function addProduct() {
    const response =
      await fetch(
        "/api/products",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            price,
            image,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {
      alert("Product Added");

      setTitle("");
      setPrice("");
      setImage("");

      loadProducts();
    }
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
        Admin Dashboard
      </h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "800px",
          marginBottom: "50px",
        }}
      >
        <input
          placeholder="Product Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            border:
              "1px solid #ccc",
            fontSize: "20px",
          }}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            border:
              "1px solid #ccc",
            fontSize: "20px",
          }}
        />

        <input
          type="file"
          onChange={uploadImage}
          style={{
            marginBottom: "20px",
            fontSize: "18px",
          }}
        />

        {image && (
          <img
            src={image}
            alt="preview"
            style={{
              width: "300px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          />
        )}

        <button
          onClick={addProduct}
          style={{
            width: "100%",
            padding: "20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </div>

      <h2
        style={{
          fontSize: "40px",
          marginBottom: "30px",
        }}
      >
        Products
      </h2>

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
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <h3
              style={{
                fontSize: "22px",
                marginTop: "20px",
              }}
            >
              {product.title}
            </h3>

            <p
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}