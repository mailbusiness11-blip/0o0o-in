// import-temu-bulk.js
import mongoose from "mongoose";
import fetch from "node-fetch";
import Product from "./models/Product.js"; // adjust path if needed
import dotenv from "dotenv";
import cheerio from "cheerio";

dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Replace with your Temu category URL
const categoryUrl =
  "https://www.temu.com/ae/c/ladies-dresses";

// Fetch category page
async function fetchCategoryProducts(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml",
    },
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  // Temu renders products via data attributes or JSON scripts
  // Extract all links to products
  const links = [];

  $("a[href*='/p/']").each((i, el) => {
    const link = $(el).attr("href");
    if (link && !links.includes(link)) {
      links.push(link.startsWith("http") ? link : `https://www.temu.com${link}`);
    }
  });

  return links;
}

// Import one product
async function importProduct(url) {
  const match = url.match(/g-(\d+)/);
  if (!match) return;
  const productId = match[1];

  const apiUrl = `https://api.temu.com/v2/search/goods/detail?goods_id=${productId}&market=AE&currency=USD&lang=en`;

  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
      accept: "application/json, text/plain, */*",
      referer: "https://www.temu.com/",
    },
  });

  const data = await res.json();
  const productData = data?.data?.result || data?.data?.goods || null;

  if (!productData) return;

  const product = new Product({
    name: productData.goodsName || productData.goods_name,
    price: productData.price || productData.goods_price || 0,
    description: productData.goodsDesc || productData.goods_desc || "",
    image:
      productData.pictures?.[0]?.url ||
      productData.imageUrl ||
      productData.goods_image_url ||
      "",
    url,
  });

  await product.save();
  console.log("Imported:", product.name);
}

// Main
(async () => {
  console.log("Fetching product links from category...");
  const productLinks = await fetchCategoryProducts(categoryUrl);

  console.log(`Found ${productLinks.length} products. Importing...`);

  for (const link of productLinks) {
    try {
      await importProduct(link);
    } catch (err) {
      console.log("Failed:", link, err.message);
    }
  }

  console.log("Bulk import complete!");
  mongoose.disconnect();
})();