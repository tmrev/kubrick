import { indieWireUrls } from "../../constants";
import webDriver from "../browser";

async function fetchIndieWireResults(movieTitle: string) {
  const driver = await webDriver();

  try {
    const searchUrl = `${indieWireUrls.search}?q=${encodeURIComponent(
      movieTitle
    )}`;

    await driver.get(searchUrl);

    const site = await driver.getPageSource();

    await driver.close();

    return site;
  } catch (error) {
    await driver.close();
    return "";
  }
}

export default fetchIndieWireResults;
