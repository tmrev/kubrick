import { load } from "cheerio";
import fetchJoBloResults from "./fetchSearchResults";
import { Sources } from "../../constants";
import parseSearchResult from "../../utils/parseSearchResult";

async function parseJoBloResult(movieTitle: string) {
  const html = await fetchJoBloResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("article")
    .map((i, el) => {
      const element = load(el);

      const payload = {
        url: element("div.featured-media-inner > a").attr("href"),
        title: element("h3 > a").text().trim(),
        img: element("div.featured-media-inner > a > img").attr("src"),
        author: "",
        publishedDate: element("time.published-date time-ago").attr("datetime"),
        type: "Article",
        snippet: element(".post-excerpt > p").text().trim(),
      };

      return parseSearchResult(payload, Sources.JOBLO);
    })
    .get();

  return mediaResults;
}

export default parseJoBloResult;
