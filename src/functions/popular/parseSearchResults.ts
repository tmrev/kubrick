import { load } from "cheerio";
import fetchPopularResults from "./fetchSearchResults";
import { Sources } from "../../constants";

async function parsePopularResult() {
  const html = await fetchPopularResults();

  const $ = load(html);

  const mediaResults = $(".countdown-item")
    .map((i, el) => {
      const element = load(el);

      return {
        url: element("h2 > a").attr("href"),
        title: element("h2 > a").text().trim(),
        img: element("a.article_movie_poster > div > img").attr("src"),
        type: "Popular",
        consensus: element("div.critics-consensus").text().trim(),
        snippet: element("div.synopsis").text().trim(),
        rank: element("div.countdown-index").text().trim(),
        source: Sources.ROTTEN_TOMATOES,
      };
    })
    .get();

  return mediaResults;
}

export default parsePopularResult;
