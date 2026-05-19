"use client";

import { useState } from "react";

export default function BulkImportPage() {
  const [urls, setUrls] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleImport = async () => {
    setLoading(true);

    setMessage("");

    const urlList = urls
      .split("\n")
      .filter((u) => u.trim() !== "");

    let successCount = 0;

    for (const url of urlList) {
      try {
        const res = await fetch(
          "/api/import",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              url,
            }),
          }
        );

        const data = await res.json();

        if (data.success) {
          successCount++;
        }
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);

    setMessage(
      `${successCount} products imported successfully`
    );
  };

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-8">
        Bulk Import Products
      </h1>

      <textarea
        value={urls}
        onChange={(e) =>
          setUrls(e.target.value)
        }
        placeholder="Paste one product URL per line"
        className="w-full h-96 border p-4 rounded-xl"
      />

      <button
        onClick={handleImport}
        disabled={loading}
        className="mt-6 bg-black text-white px-8 py-4 rounded-xl"
      >
        {loading
          ? "Importing..."
          : "Start Bulk Import"}
      </button>

      {message && (
        <p className="mt-6 text-2xl">
          {message}
        </p>
      )}
    </main>
  );
}