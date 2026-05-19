import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ success: false, error: "URL is required" });
    }

    // Extract Temu product ID
    const match = url.match(/g-(\d+)/);
    if (!match) {
      return NextResponse.json({ success: false, error: "Invalid Temu URL" });
    }
    const productId = match[1];

    const apiUrl = `https://api.temu.com/v2/search/goods/detail?goods_id=${productId}&market=AE&currency=USD&lang=en`;

    const apiRes = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
        accept: "application/json, text/plain, */*",
        referer: "https://www.temu.com/",
      },
    });

    const data = await apiRes.json();

    const productData = data?.data?.result || data?.data?.goods || null;

    if (!productData) {
      return NextResponse.json({
        success: false,
        error: "Temu API returned no product data",
      });
    }

    await connectDB();

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

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: (error as any).message,
    });
  }
}