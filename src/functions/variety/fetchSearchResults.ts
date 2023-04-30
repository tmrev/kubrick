import { Browser, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { varietyUrls } from "../../constants";

async function fetchVarietyResults(movieTitle: string) {
  const driver = new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(new chrome.Options().headless())
    .build();

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
