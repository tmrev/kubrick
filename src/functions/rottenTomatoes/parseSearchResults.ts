import { load } from "cheerio";
import fetchSearchResults from "./fetchSearchResults";

type SearchResults = {
  id?: string;
  img?: string;
  title?: string;
  type?: string;
  url?: string;
  year?: string;
};

async function parseSearchResult(
  movieTitle: string
): Promise<SearchResults | null> {
  const html = await fetchSearchResults(movieTitle);

  const $ = load(html);

  const movieResults = $("search-page-media-row")
    .map((i, el) => {
      const element = load(el);

      return {
        url: element("a:nth-child(1)").attr("href"),
        img: element("a:nth-child(1) > img").attr("src"),
        type: element("a:nth-child(1)").attr("href")?.split("/")[3],
        id: element("a:nth-child(1)").attr("href")?.split("/")[4],
        title: element("a:nth-child(2)").text().trim(),
        year: $(el).attr("releaseyear"),
      } as SearchResults;
    })
    .get();

  if (!movieResults.length) return null;

  const firstResult = movieResults[0];

  return {
    ...firstResult,
  };
}

export default parseSearchResult;
