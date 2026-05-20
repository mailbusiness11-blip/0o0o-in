import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const filePath = path.join(process.cwd(), "TemuProducts.json"); // your uploaded file

async function importProducts() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    for (const p of products) {
      // Only import Ladies Dresses
      if (p.category && p.category.toLowerCase() !== "ladies dresses") continue;

      const product = new Product({
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image,
        url: p.url,
        category: p.category,
      });

      await product.save();
      console.log("Imported:", p.name);
    }

    console.log("All products imported successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error importing products:", error);
    mongoose.disconnect();
  }
}

importProducts();