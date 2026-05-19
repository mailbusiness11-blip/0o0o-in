import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ success: false });

    // Extract Temu product ID from URL
    const match = url.match(/g-(\d+)/);
    if (!match) return NextResponse.json({ success: false, error: "Invalid Temu URL" });

    const productId = match[1];

    // Fetch JSON from Temu internal API
    const apiRes = await fetch(`https://api.temu.com/v2/goods/detail?goods_id=${productId}`);
    const data = await apiRes.json();

    if (!data?.data) return NextResponse.json({ success: false, error: "Failed to fetch product data" });

    const productData = data.data;

    // Connect to MongoDB
    await connectDB();

    // Save product
    const product = new Product({
      name: productData.goods_name,
      price: productData.price || 0,
      description: productData.goods_desc || "",
      image: productData.pictures?.[0]?.url || "",
      url,
    });

    await product.save();

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: (error as any).message });
  }
}