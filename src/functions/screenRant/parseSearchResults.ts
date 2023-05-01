import { load } from "cheerio";
import fetchScreenRantResults from "./fetchSearchResults";
import { Sources, screenRantUrls } from "../../constants";
import parseSearchResult from "../../utils/parseSearchResult";

async function parseScreenRantSearchResult(movieTitle: string) {
  const html = await fetchScreenRantResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("div.article")
    .map((i, el) => {
      const element = load(el);

      const payload = {
        url: `${screenRantUrls.base}${element("a.dc-img-link").attr("href")}`,
        title: element("h5.display-card-title > a").text().trim(),
        img: element("figure > picture > source:nth-child(1)").attr("srcset"),
        author: element("a.display-card-author").text().trim(),
        publishedDate: element("time.display-card-date").attr("datetime"),
        type: "Article",
        snippet: element("p.display-card-excerpt").text().trim(),
      };

      return parseSearchResult(payload, Sources.SCREEN_RANT);
    })
    .get();

  return mediaResults;
}

export default parseScreenRantSearchResult;
