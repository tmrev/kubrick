import { Browser, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { deadlineUrls } from "../../constants";

async function fetchDeadlineResults(movieTitle: string) {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(new chrome.Options().headless())
    .build();

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
