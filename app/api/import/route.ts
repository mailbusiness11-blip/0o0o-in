import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({
        success: false,
        error: "URL is required",
      });
    }

    // Fetch the product page
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    });
    const html = await res.text();

    // Parse with cheerio
    const $ = cheerio.load(html);

    // Extract Temu product details
    const title =
      $("h1[data-testid='ProductTitle']").text() ||
      $("title").text();

    const priceText = $("div[data-testid='ProductPrice']")
      .text()
      .replace(/[^\d.]/g, "");
    const price = parseFloat(priceText) || 0;

    const image =
      $("img[data-testid='GalleryImage']")
        .first()
        .attr("src") || "";

    const description =
      $("meta[name='description']").attr("content") || "";

    if (!title || !image) {
      return NextResponse.json({
        success: false,
        error: "Failed to extract product info from Temu",
      });
    }

    // Save to MongoDB
    await connectDB();

    const newProduct = new Product({
      name: title,
      price,
      description,
      image,
      url,
    });

    await newProduct.save();

    return NextResponse.json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: (error as any).message,
    });
  }
}