import { hollywoodUrls } from "../../constants";
import webDriver from "../browser";

async function fetchHollywoodResults(movieTitle: string) {
  const driver = await webDriver();

  try {
    const searchUrl = `${hollywoodUrls.search}?q=${encodeURIComponent(
      movieTitle
    )}`;

    await driver.get(searchUrl);

    const site = await driver.getPageSource();

    await driver.quit();

    return site;
  } catch (error) {
    await driver.quit();

    return "";
  }
}

export default fetchHollywoodResults;
