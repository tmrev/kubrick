/* eslint-disable no-return-assign */
import puppeteer from "puppeteer";
import { empireUrls } from "../../constants";

async function fetchEmpireResults(movieTitle: string) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  try {
    const page = await browser.newPage();
    const searchUrl = empireUrls.base;

    await page.goto(searchUrl);

    await page.waitForTimeout(2000);

    // const search = await browser.findElement(By.id("gsc-i-id1"));

    // eslint-disable-next-line no-param-reassign
    await page.$eval("#gsc-i-id1", (el: any) => (el.value = movieTitle));

    // await browser.executeScript(
    //   `document.getElementById("gsc-i-id1").setAttribute('value', ${movieTitle})`,
    //   search
    // );

    // const button = await browser.findElement(By.className("gsc-search-button"));

    await page.click(
      "#___gcse_0 > div > div > form > table > tbody > tr > td.gsc-search-button > button"
    );

    await page.waitForSelector(
      "#___gcse_0 > div > div > div.gsc-results-wrapper-overlay.gsc-results-wrapper-visible"
    );

    const site = await page.content();

    await browser.close();

    return site;
  } catch (error) {
    browser.close();
    return "";
  }
}

export default fetchEmpireResults;
