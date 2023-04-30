import { load } from "cheerio";
import dayjs from "dayjs";
import fetchPlaylistResults from "./fetchSearchResults";
import { Sources } from "../../constants";

async function parsePlaylistResult(movieTitle: string) {
  const html = await fetchPlaylistResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("article")
    .map((i, el) => {
      const element = load(el);

      return {
        url: element("div.cs-mask > a").attr("href"),
        title: element("h2.cb-post-title > a").text().trim(),
        img: element("div.cs-mask > a > img").attr("src"),
        author: element("div.cb-author > a").text().trim(),
        publishedDate: dayjs(
          element("div.cb-date > time").attr("datetime")
        ).format(),
        type: "Article",
        snippet: element(".cb-excerpt").text().trim(),
        source: Sources.PLAYLIST,
      };
    })
    .get();

  return mediaResults;
}

export default parsePlaylistResult;
