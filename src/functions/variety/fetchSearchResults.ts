import { varietyUrls } from "../../constants";
import webDriver from "../browser";

async function fetchVarietyResults(movieTitle: string) {
  const driver = await webDriver();

  try {
    const searchUrl = `${varietyUrls.search}?q=${encodeURIComponent(
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
export default fetchVarietyResults;
