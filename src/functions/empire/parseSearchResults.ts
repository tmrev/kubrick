import { load } from "cheerio";
import fetchEmpireResults from "./fetchSearchResults";
import { Sources } from "../../constants";
import parseSearchResult from "../../utils/parseSearchResult";

async function parseEmpireSearchResult(movieTitle: string) {
  const html = await fetchEmpireResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("div.gsc-webResult")
    .map((i, el) => {
      const element = load(el);

      const data = element("div.gs-snippet").text().trim();

      const [date, snippet] = data.split("...");

      const payload = {
        url: element("a.gs-title").attr("href"),
        title: element("a.gs.title").text().trim(),
        img: element("img.gs-image").attr("src"),
        author: "",
        publishedDate: date.trim(),
        type: "Article",
        snippet: snippet.trim(),
      };

      return parseSearchResult(payload, Sources.EMPIRE);
    })
    .get();

  return mediaResults;
}

export default parseEmpireSearchResult;
