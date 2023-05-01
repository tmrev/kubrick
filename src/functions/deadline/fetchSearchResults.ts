import { deadlineUrls } from "../../constants";
import webDriver from "../browser";

async function fetchDeadlineResults(movieTitle: string) {
  const driver = await webDriver();

  try {
    const searchUrl = `${deadlineUrls.search}?q=${encodeURIComponent(
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

export default fetchDeadlineResults;
