import { load } from "cheerio";
import dayjs from "dayjs";
import fetchHollywoodResults from "./fetchSearchResults";
import { Sources } from "../../constants";

async function parseHollywoodSearchResult(movieTitle: string) {
  const html = await fetchHollywoodResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("div.result")
    .map((i, el) => {
      const element = load(el);

      return {
        url: element("div.result-title > a").attr("href"),
        title: element("div.result-title > a").text().trim(),
        img: element("div.result-image > img").attr("src"),
        author: element("div.result-content > div.byline > span:nth-child(1)")
          .text()
          .trim(),
        publishedDate: dayjs(
          element("div.result-content > div.byline > span:nth-child(2)")
            .text()
            .trim()
        ),
        type: element("div.result-content > div.byline > span:nth-child(3)")
          .text()
          .trim(),
        snippet: element("div.result-content > div.text-block").text().trim(),
        source: Sources.HOLLYWOOD,
      };
    })
    .get();

  return mediaResults;
}

export default parseHollywoodSearchResult;