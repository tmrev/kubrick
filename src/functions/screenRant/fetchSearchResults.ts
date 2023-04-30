import axios from "axios";
import { screenRantUrls } from "../../constants";
import { cache } from "../../app";

async function fetchScreenRantResults(movieTitle: string) {
  const searchUrl = `${screenRantUrls.search}?q=${movieTitle.replace(
    / /g,
    "+"
  )}`;

  const siteCache = cache.get(movieTitle) as string;

  if (siteCache) return siteCache;

  const response = await axios.get(searchUrl);

  cache.set(movieTitle, response.data);

  return response.data;
}

export default fetchScreenRantResults;
