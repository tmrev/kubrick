import { Browser, Builder } from "selenium-webdriver";
import { deadlineUrls } from "../../constants";
import { cache } from "../../app";

async function fetchDeadlineResults(movieTitle: string) {
  const searchUrl = `${deadlineUrls.search}?q=${encodeURIComponent(
    movieTitle
  )}`;

  const siteCache = cache.get(movieTitle) as string;

  if (siteCache) return siteCache;

  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get(searchUrl);

  const site = await driver.getPageSource();
  cache.set(movieTitle, site);

  await driver.close();

  return site;
}

export default fetchDeadlineResults;
