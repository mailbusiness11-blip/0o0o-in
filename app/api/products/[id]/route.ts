import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Product from "@/models/Product";

export async function PUT(
  req: Request,
  context: any
) {
  try {
    await connectDB();

    const body = await req.json();

    await Product.findByIdAndUpdate(
      context.params.id,
      body
    );

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