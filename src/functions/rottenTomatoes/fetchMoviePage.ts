import axios from "axios";
import { load } from "cheerio";
import parseSearchResult from "./parseSearchResults";
import { AppError, HttpCode } from "../../expections/AppError";
import createProxy from "../../utils/createProxy";

async function fetchMoviePage(movieTitle: string) {
  const searchResult = await parseSearchResult(movieTitle);

  if (!searchResult || !searchResult.url) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: "unable to find searched movie",
    });
  }

  const response = await axios.get(searchResult.url, { proxy: createProxy() });

  const html = response.data;

  const $ = load(html);

  return {
    audience: {
      score: $("score-board").attr("audiencescore"),
      state: $("score-board").attr("audiencestate"),
    },
    tomatometer: {
      score: $("score-board").attr("tomatometerscore"),
      state: $("score-board").attr("tomatometerstate"),
    },
  };
}

export default fetchMoviePage;
