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

const filePath = path.join(process.cwd(), "TemuProducts.json"); // use your uploaded JSON file

async function importProducts() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    // Insert all products from JSON directly into MongoDB
    await Product.insertMany(products);
    console.log(`Imported ${products.length} products successfully!`);

    mongoose.disconnect();
  } catch (error) {
    console.error("Error importing products:", error);
    mongoose.disconnect();
  }
}

importProducts();