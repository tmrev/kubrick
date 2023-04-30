import { load } from "cheerio";
import dayjs from "dayjs";
import fetchEmpireResults from "./fetchSearchResults";
import { Sources } from "../../constants";

async function parseEmpireSearchResult(movieTitle: string) {
  const html = await fetchEmpireResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("div.gsc-webResult")
    .map((i, el) => {
      const element = load(el);

      const data = element("div.gs-snippet").text().trim();

      const [date, snippet] = data.split("...");

      return {
        url: element("a.gs-title").attr("href"),
        title: element("a.gs.title").text().trim(),
        img: element("img.gs-image").attr("src"),
        author: null,
        publishedDate: dayjs(date.trim()).format(),
        type: "Article",
        snippet: snippet.trim(),
        source: Sources.EMPIRE,
      };
    })
    .get();

  return mediaResults;
}

export default parseEmpireSearchResult;
