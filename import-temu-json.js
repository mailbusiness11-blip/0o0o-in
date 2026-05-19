// import-temu-json.js
import mongoose from "mongoose";
import fetch from "node-fetch";
import Product from "./models/Product.js"; // adjust path if needed
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// List of Temu product URLs
const temuUrls = [
  "https://www.temu.com/ae/-summer--print-contrast-short-sleeve-elegant-womens-dress-g-601105736976556.html",
  // add more product URLs here
];

async function importProduct(url) {
  try {
    const match = url.match(/g-(\d+)/);
    if (!match) {
      console.log("Invalid URL:", url);
      return;
    }
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

    if (!productData) {
      console.log("No product data for:", url);
      return;
    }

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
  } catch (err) {
    console.log("Error importing:", url, err.message);
  }
}

(async () => {
  for (const url of temuUrls) {
    await importProduct(url);
  }
  console.log("All done!");
  mongoose.disconnect();
})();