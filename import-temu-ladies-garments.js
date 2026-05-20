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

// Path to your uploaded JSON file
const filePath = path.join(process.cwd(), "TemuProducts.json"); // replace with your uploaded file name

async function importProducts() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    // Filter products for Ladies Garments categories
    const ladiesGarments = products.filter((p) => {
      if (!p.category) return false;
      // Match categories containing keywords for ladies garments
      return /dress|top|skirt|blouse|tunic|garment/i.test(p.category);
    });

    console.log(`Found ${ladiesGarments.length} ladies garments.`);

    await Product.insertMany(ladiesGarments);
    console.log("All ladies garments imported successfully!");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error importing products:", error);
    mongoose.disconnect();
  }
}

importProducts();