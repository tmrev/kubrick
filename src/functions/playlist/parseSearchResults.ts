import { load } from "cheerio";
import fetchPlaylistResults from "./fetchSearchResults";
import { Sources } from "../../constants";
import parseSearchResult from "../../utils/parseSearchResult";

async function parsePlaylistResult(movieTitle: string) {
  const html = await fetchPlaylistResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("article")
    .map((i, el) => {
      const element = load(el);

      const payload = {
        url: element("div.cs-mask > a").attr("href"),
        title: element("h2.cb-post-title > a").text().trim(),
        img: element("div.cs-mask > a > img").attr("src"),
        author: element("div.cb-author > a").text().trim(),
        publishedDate: element("div.cb-date > time").attr("datetime"),
        type: "Article",
        snippet: element(".cb-excerpt").text().trim(),
      };

      return parseSearchResult(payload, Sources.PLAYLIST);
    })
    .get();

  return mediaResults;
}

export default parsePlaylistResult;
