import { load } from "cheerio";
import { Sources } from "../../constants";
import { ParseResults } from "../../models/parseResults";
import parseSearchResult from "../../utils/parseSearchResult";

async function parseVarietySearchResult(html: string) {
  const $ = load(html);

  const mediaResults: ParseResults[] = $("div.result")
    .map((i, el) => {
      const element = load(el);

      const payload = {
        url: element("div.result-title > a").attr("href"),
        title: element("div.result-title > a").text().trim(),
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
        img: element("div.result-image > img").attr("src"),
      };

      return parseSearchResult(payload, Sources.VARIETY);
    })
    .get();

  if (!mediaResults.length) return null;

  return mediaResults;
}

export default parseVarietySearchResult;
