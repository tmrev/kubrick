import { By, until } from "selenium-webdriver";
import { empireUrls } from "../../constants";
import webDriver from "../browser";

async function fetchEmpireResults(movieTitle: string) {
  const driver = await webDriver();

  try {
    const searchUrl = empireUrls.base;

    await driver.get(searchUrl);

    await driver.wait(until.elementLocated(By.id("gsc-i-id1")), 1000);

    const search = await driver.findElement(By.id("gsc-i-id1"));

    await driver.executeScript(
      `document.getElementById("gsc-i-id1").setAttribute('value', ${movieTitle})`,
      search
    );

    const button = await driver.findElement(By.className("gsc-search-button"));

    await driver.actions().click(button).perform();

    await driver.wait(
      until.elementLocated(By.className("gsc-results-wrapper-visible")),
      1000
    );

    const site = await driver.getPageSource();

    await driver.quit();

    return site;
  } catch (error) {
    driver.quit();
    return "";
  }
}

export default fetchEmpireResults;
