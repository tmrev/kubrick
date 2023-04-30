import { load } from "cheerio";
import dayjs from "dayjs";
import fetchScreenRantResults from "./fetchSearchResults";
import { Sources, screenRantUrls } from "../../constants";

async function parseScreenRantSearchResult(movieTitle: string) {
  const html = await fetchScreenRantResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("div.article")
    .map((i, el) => {
      const element = load(el);

      return {
        url: `${screenRantUrls.base}${element("a.dc-img-link").attr("href")}`,
        title: element("h5.display-card-title > a").text().trim(),
        img: element("figure > picture > source:nth-child(1)").attr("srcset"),
        author: element("a.display-card-author").text().trim(),
        publishedDate: dayjs(
          element("time.display-card-date").attr("datetime")
        ),
        type: "Article",
        snippet: element("p.display-card-excerpt").text().trim(),
        source: Sources.SCREEN_RANT,
      };
    })
    .get();

  return mediaResults;
}

export default parseScreenRantSearchResult;
