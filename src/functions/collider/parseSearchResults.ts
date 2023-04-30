import { load } from "cheerio";
import dayjs from "dayjs";
import fetchColliderResults from "./fetchSearchResults";
import { Sources, colliderUrls } from "../../constants";

async function parseColliderSearchResult(movieTitle: string) {
  const html = await fetchColliderResults(movieTitle);

  const $ = load(html);

  const mediaResults = $("div.article")
    .map((i, el) => {
      const element = load(el);

      return {
        url: `${colliderUrls.base}${element("a.dc-img-link").attr("href")}`,
        title: element("h5.display-card-title > a").text().trim(),
        img: element("figure > picture > source:nth-child(1)").attr("srcset"),
        author: element("a.display-card-author").text().trim(),
        publishedDate: dayjs(
          element("time.display-card-date").attr("datetime")
        ).format(),
        type: "Article",
        snippet: element("p.display-card-excerpt").text().trim(),
        source: Sources.COLLIDER,
      };
    })
    .get();

  return mediaResults;
}

export default parseColliderSearchResult;
