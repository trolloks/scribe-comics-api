import cheerio from "cheerio";
import puppeteer from "puppeteer";

export async function scrapeDownloadUrl(url: string): Promise<string> {
  console.log("Scraping website...");
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    const response = await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 240000,
    });
    if (response) {
      const html = await page.content();
      const $ = cheerio.load(html);

      let link: string | undefined;
      // eslint-disable-next-line func-names
      $(".aio-pulse > a").each(function (this: any) {
        if (!link) {
          link = $(this).attr("href");
          console.log(link);
        }
      });
      return link || "";
    }
  } catch (err) {
    console.log(err);
  }
  return "";
}
