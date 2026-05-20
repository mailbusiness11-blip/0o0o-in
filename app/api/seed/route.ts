import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

const categories = [
  "Mobiles",
  "Laptops",
  "Fashion",
  "Shoes",
  "Watches",
  "Headphones",
  "Home Decor",
  "Kitchen",
  "Beauty",
  "Toys",
  "Bags",
  "Electronics",
  "Sports",
  "Jewellery",
  "Accessories",
];

export async function GET() {
  try {
    await connectDB();

    const products = [];

    for (let i = 1; i <= 1000; i++) {
      const category = categories[i % categories.length];

      products.push({
        title: `${category} Product ${i}`,
        price: `₹${Math.floor(Math.random() * 5000) + 199}`,
        category,
        image: `https://picsum.photos/seed/0o0o-${category}-${i}/600/600`,
      });
    }

    await Product.deleteMany({});
    await Product.insertMany(products);

    return NextResponse.json({
      success: true,
      message: "1000 demo products added",
      total: products.length,
      categories: categories.length,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}