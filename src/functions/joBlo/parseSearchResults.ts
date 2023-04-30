import { load } from "cheerio";
import dayjs from "dayjs";
import fetchJoBloResults from "./fetchSearchResults";
import { Sources } from "../../constants";

async function parseJoBloResult(movieTitle: string) {
  const html = await fetchJoBloResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("article")
    .map((i, el) => {
      const element = load(el);

      return {
        url: element("div.featured-media-inner > a").attr("href"),
        title: element("h3 > a").text().trim(),
        img: element("div.featured-media-inner > a > img").attr("src"),
        author: null,
        publishedDate: dayjs(
          element("time.published-date time-ago").attr("datetime")
        ),
        type: "Article",
        snippet: element(".post-excerpt > p").text().trim(),
        source: Sources.JOBLO,
      };
    })
    .get();

  return mediaResults;
}

export default parseJoBloResult;
