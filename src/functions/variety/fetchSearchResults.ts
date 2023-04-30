import { Browser, Builder } from "selenium-webdriver";
import { varietyUrls } from "../../constants";
import { cache } from "../../app";

async function fetchVarietyResults(movieTitle: string) {
  const searchUrl = `${varietyUrls.search}?q=${encodeURIComponent(movieTitle)}`;

  const siteCache = cache.get(movieTitle) as string;

  if (siteCache) return siteCache;

  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get(searchUrl);

  const site = await driver.getPageSource();
  cache.set(movieTitle, site);

  await driver.close();

  return site;
}
export default fetchVarietyResults;
