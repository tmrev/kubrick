import { Browser, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { indieWireUrls } from "../../constants";

async function fetchIndieWireResults(movieTitle: string) {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(new chrome.Options().headless())
    .build();

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
