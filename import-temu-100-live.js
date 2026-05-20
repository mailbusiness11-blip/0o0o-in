import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const filePath = path.join(process.cwd(), "TemuProducts.json"); // use your uploaded JSON

async function importProducts() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    // Filter only the first 100 Ladies Dresses
    const ladiesDresses = products.filter(
      (p) => p.category && p.category.toLowerCase() === "ladies dresses"
    ).slice(0, 100);

    await Product.insertMany(ladiesDresses);
    console.log(`Imported ${ladiesDresses.length} ladies dresses successfully!`);

    mongoose.disconnect();
  } catch (error) {
    console.error("Error importing products:", error);
    mongoose.disconnect();
  }
}

importProducts();