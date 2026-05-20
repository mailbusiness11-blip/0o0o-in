import { NextResponse } from "next/server";

type ScrapedProduct = {
  title: string;
  price: string;
  image: string;
  sourceUrl: string;
};

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "Product URL is required" },
        { status: 400 }
      );
    }

    if (!url.includes("pinduoduo.com") && !url.includes("yangkeduo.com")) {
      return NextResponse.json(
        { success: false, error: "Only Pinduoduo product URLs are allowed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: false,
      error:
        "Direct automated scraping from Pinduoduo may be blocked or disallowed. Use supplier CSV/API/manual product import instead.",
      sourceUrl: url,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Scraper failed",
      },
      { status: 500 }
    );
  }
}