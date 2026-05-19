// import-temu-full-ready.js
import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cheerio from "cheerio";
import Product from "./models/Product.js"; // adjust path if needed

dotenv.config();

// MongoDB connection
await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Temu categories to import
const categories = [
  "https://www.temu.com/ae/c/ladies-dresses",
  "https://www.temu.com/ae/c/gadgets",
  "https://www.temu.com/ae/c/kitchen-tools",
  // add more categories if needed
];

// Fetch product links from a single category page
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

  const links = [];
  $("a[href*='/p/']").each((i, el) => {
    const link = $(el).attr("href");
    if (link && !links.includes(link)) {
      links.push(link.startsWith("http") ? link : `https://www.temu.com${link}`);
    }
  });

  return links;
}

// Import a single product using Temu internal JSON API
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

// Main function: loop through categories and pages
(async () => {
  for (const categoryUrl of categories) {
    console.log("Importing category:", categoryUrl);

    let page = 1;
    let totalProducts = 0;

    while (true) {
      const pagedUrl = `${categoryUrl}?page=${page}`;
      const links = await fetchCategoryProducts(pagedUrl);

      if (links.length === 0) break;

      for (const link of links) {
        try {
          await importProduct(link);
          totalProducts++;
        } catch (err) {
          console.log("Failed:", link, err.message);
        }
      }

      console.log(`Page ${page} done, total imported so far: ${totalProducts}`);
      page++;
    }

    console.log(`Finished category: ${categoryUrl}, total imported: ${totalProducts}`);
  }

  console.log("All categories imported successfully!");
  mongoose.disconnect();
})();