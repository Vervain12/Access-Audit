import AxePuppeteer from "@axe-core/puppeteer";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { NextResponse } from "next/server";
import "axe-core";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "No url given." },
        { status: 400 }
      );
    }

    const isLocal = !process.env.AWS_REGION;
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: isLocal
        ? (await import("puppeteer")).executablePath()
        : await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector("body", { timeout: 10000 });

    const results = await new AxePuppeteer(page)
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .options({
        timeout: 30000,
        exclude: [
          ['iframe[src*="google"]'],
          ['iframe[src*="facebook"]'],
        ],
      })
      .analyze();

    await page.setViewport({
      width: 1366,
      height: 768,
    });

    const image = await page.screenshot({ fullPage: true });
    await browser.close();

    const imageBase64 = image.toString("base64");

    return NextResponse.json({ results, image: imageBase64 });

  } catch (error) {
    console.error("AXE error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error", stack: error.stack },
      { status: 400 }
    );
  }
}
