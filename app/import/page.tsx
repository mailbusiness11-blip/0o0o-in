"use client";

import { useState } from "react";

export default function ImportPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const importProduct = async () => {
    if (!url) return;

    setLoading(true);

    try {
      const scrapeRes = await fetch("/api/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });

      const scrapeData = await scrapeRes.json();

      console.log(scrapeData);

      if (!scrapeData.success) {
        alert(scrapeData.error);
        setLoading(false);
        return;
      }

      const saveRes = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scrapeData.product),
      });

      const saveData = await saveRes.json();

      console.log(saveData);

      alert("Product Imported To Store");

      setUrl("");
    } catch (err) {
      console.error(err);
      alert("Import failed");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8">
          Pinduoduo Auto Importer
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Paste Product URL"
            className="w-full border p-4 rounded-lg"
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
          />

          <button
            onClick={importProduct}
            className="bg-black text-white px-8 py-4 rounded-xl"
          >
            {loading
              ? "Importing..."
              : "Auto Import Product"}
          </button>
        </div>
      </div>
    </main>
  );
}