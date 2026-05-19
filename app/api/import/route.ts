import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ success: false });

    // Extract product ID from Temu URL
    const match = url.match(/g-(\d+)/);
    if (!match) return NextResponse.json({ success: false });

    const productId = match[1];

    // Fetch JSON from Temu API
    const apiRes = await fetch(
      `https://api.temu.com/v2/goods/detail?goods_id=${productId}`
    );
    const data = await apiRes.json();

    const productData = data?.data;
    if (!productData) return NextResponse.json({ success: false });

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
    return NextResponse.json({ success: false, error: error.message });
  }
}import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ success: false });

    // Extract product ID from Temu URL
    const match = url.match(/g-(\d+)/);
    if (!match) return NextResponse.json({ success: false });

    const productId = match[1];

    // Fetch JSON from Temu API
    const apiRes = await fetch(
      `https://api.temu.com/v2/goods/detail?goods_id=${productId}`
    );
    const data = await apiRes.json();

    const productData = data?.data;
    if (!productData) return NextResponse.json({ success: false });

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
    return NextResponse.json({ success: false, error: error.message });
  }
}