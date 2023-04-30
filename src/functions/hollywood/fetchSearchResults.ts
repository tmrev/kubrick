import { Browser, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { hollywoodUrls } from "../../constants";

async function fetchHollywoodResults(movieTitle: string) {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(new chrome.Options().headless())
    .build();

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
