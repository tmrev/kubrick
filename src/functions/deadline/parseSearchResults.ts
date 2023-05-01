import { load } from "cheerio";
import fetchDeadlineResults from "./fetchSearchResults";
import { Sources } from "../../constants";
import parseSearchResult from "../../utils/parseSearchResult";

async function parseDeadlineSearchResult(movieTitle: string) {
  const html = await fetchDeadlineResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("div.result")
    .map((i, el) => {
      const element = load(el);

      const payload = {
        url: element("div.result-title > a").attr("href"),
        title: element("div.result-title > a").text().trim(),
        img: element("div.result-image > img").attr("src"),
        author: element("div.result-content > div.byline > span:nth-child(1)")
          .text()
          .trim(),
        publishedDate: element(
          "div.result-content > div.byline > span:nth-child(2)"
        )
          .text()
          .trim(),
        type: element("div.result-content > div.byline > span:nth-child(3)")
          .text()
          .trim(),
        snippet: element("div.result-content > div.text-block").text().trim(),
      };

      return parseSearchResult(payload, Sources.DEADLINE);
    })
    .get();

  return mediaResults;
}

export default parseDeadlineSearchResult;
