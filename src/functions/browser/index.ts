import { Browser, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chromiumBinary = require("chromium-binary");

const webDriver = async () => {
  try {
      const options = new chrome.Options();

  console.log(chromiumBinary.path)

  options.headless();
  options.setChromeBinaryPath(chromiumBinary.path);
  options.addArguments("start-maximized"); // open Browser in maximized mode
options.addArguments("disable-infobars"); // disabling infobars
options.addArguments("--disable-extensions"); // disabling extensions
options.addArguments("--disable-gpu"); // applicable to windows os only
options.addArguments("--disable-dev-shm-usage"); // overcome limited resource problems
options.addArguments("--no-sandbox"); // Bypass OS security model

  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  return driver;
  } catch (error) {
    console.error(error)
    return '' as any
  }

};

export default webDriver;
