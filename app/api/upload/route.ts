import { v2 as cloudinary } from "cloudinary";

import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "duy8c1gcd",

  api_key: "312545959237166",

  api_secret: "JKQnX_mapJzJh3kyZbnS30HKeL0",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.image) {
      return NextResponse.json({
        success: false,
        error: "No image provided",
      });
    }

    const uploadedImage =
      await cloudinary.uploader.upload(
        body.image,
        {
          folder: "products",
        }
      );

    return NextResponse.json({
      success: true,
      image:
        uploadedImage.secure_url,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}