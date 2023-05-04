/* eslint-disable no-unused-vars */
import puppeteer from "puppeteer";
import { queue, AsyncQueue } from "async";

interface ScrapeTask {
  callback: (err: Error | null, result?: any) => void;
  url: string;
}

async function createScraper(concurrency: number) {
  try {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const processTask = async (
      task: ScrapeTask,
      done: (err?: Error) => void
    ) => {
      try {
        const page = await browser.newPage();
        await page.goto(task.url);
        const content = await page.content();
        await page.close();
        task.callback(null, content);
      } catch (err) {
        task.callback(err as any);
      } finally {
        done();
      }
    };

    const scraperQueue: AsyncQueue<ScrapeTask> = queue<ScrapeTask>(
      processTask,
      concurrency
    );

    return {
      enqueue(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
          scraperQueue.push({
            url,
            callback: (err, result) => (err ? reject(err) : resolve(result)),
          });
        });
      },
      close() {
        return browser.close();
      },
      queue: scraperQueue,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
}

export default createScraper;
