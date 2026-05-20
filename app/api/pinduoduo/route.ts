import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const goodsIds =
      searchParams.get("goods_ids") ||
      searchParams.get("goodsIds") ||
      searchParams.get("itemId");

    if (!goodsIds) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing goods_ids",
          example: "/api/pinduoduo?goods_ids=6238377785",
        },
        { status: 400 }
      );
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost = process.env.RAPIDAPI_HOST;

    if (!rapidApiKey || !rapidApiHost) {
      return NextResponse.json(
        {
          success: false,
          error: "RapidAPI env variables missing",
        },
        { status: 500 }
      );
    }

    const apiUrl = `https://${rapidApiHost}/Good/GoodsBasic.ashx?goods_ids=${encodeURIComponent(
      goodsIds
    )}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": rapidApiHost,
        "x-rapidapi-key": rapidApiKey,
      },
      cache: "no-store",
    });

    const text = await response.text();

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      goods_ids: goodsIds,
      endpoint: "/Good/GoodsBasic.ashx",
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
