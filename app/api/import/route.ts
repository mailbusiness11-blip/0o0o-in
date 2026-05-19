import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const url = body.url;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const data = await page.evaluate(() => {
      const rawTitle =
        document.title || "Imported Product";

      const title = rawTitle
        .replace(/拼多多/g, "")
        .replace(/Pinduoduo/g, "")
        .replace(/\|.*/g, "")
        .trim();

      let image =
        (
          document.querySelector(
            'meta[property="og:image"]'
          ) as HTMLMetaElement
        )?.content || "";

      if (!image) {
        const firstImg =
          document.querySelector("img");

        image =
          (firstImg as HTMLImageElement)?.src || "";
      }

      const description =
        (
          document.querySelector(
            'meta[property="og:description"]'
          ) as HTMLMetaElement
        )?.content || "";

      return {
        title,
        image,
        description,
      };
    });

    await browser.close();

    const generatedPrice = Math.floor(
      Math.random() * (4999 - 999) + 999
    );

    return NextResponse.json({
      success: true,
      product: {
        name: data.title,
        image: data.image,
        description: data.description,
        price: generatedPrice,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}