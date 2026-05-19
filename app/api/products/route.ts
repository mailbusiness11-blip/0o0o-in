import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const product = await Product.create(body);

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    await Product.findByIdAndDelete(body.id);

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}