import axios from "axios";
import { colliderUrls } from "../../constants";
import { cache } from "../../app";

async function fetchColliderResults(movieTitle: string) {
  const searchUrl = `${colliderUrls.search}?q=${movieTitle.replace(/ /g, "+")}`;

  const siteCache = cache.get(movieTitle) as string;

  if (siteCache) return siteCache;

  const response = await axios.get(searchUrl);

  cache.set(movieTitle, response.data);

  return response.data;
}

export default fetchColliderResults;
