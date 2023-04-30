import axios from "axios";
import { thePlayListUrls } from "../../constants";
import { cache } from "../../app";

async function fetchPlaylistResults(movieTitle: string) {
  const searchUrl = `${thePlayListUrls.search}?s=${movieTitle.replace(
    / /g,
    "+"
  )}`;

  const siteCache = cache.get(movieTitle) as string;

  if (siteCache) return siteCache;

  const response = await axios.get(searchUrl);

  cache.set(movieTitle, response.data);

  return response.data;
}

export default fetchPlaylistResults;
