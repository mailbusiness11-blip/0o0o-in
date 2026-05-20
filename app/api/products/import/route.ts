import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

const ProductSchema =
  mongoose.models.Product?.schema ||
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        default: "",
      },
      sourceUrl: {
        type: String,
        default: "",
      },
      category: {
        type: String,
        default: "Imported",
      },
      stock: {
        type: Number,
        default: 1,
      },
    },
    {
      timestamps: true,
    }
  );

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { title, price, image, sourceUrl } = body;

    if (!title || !price) {
      return NextResponse.json(
        {
          success: false,
          error: "Product title and price are required",
        },
        { status: 400 }
      );
    }

    const product = await Product.create({
      title,
      price,
      image: image || "",
      sourceUrl: sourceUrl || "",
    });

    return NextResponse.json({
      success: true,
      message: "Product imported successfully",
      product,
    });
  } catch (error: any) {
    console.error("Import product error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to import product",
      },
      { status: 500 }
    );
  }
}