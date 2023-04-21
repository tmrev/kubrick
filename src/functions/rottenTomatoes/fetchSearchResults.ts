import axios from "axios";
import { rottenTomatoesUrls } from "../../constants";
import createProxy from "../../utils/createProxy";

async function fetchSearchResults(movieTitle: string) {
  const searchUrl = `${rottenTomatoesUrls.search}?search=${encodeURIComponent(
    movieTitle
  )}`;
  const response = await axios.get(searchUrl, {
    proxy: createProxy(),
  });

  return response.data;
}

export default fetchSearchResults;
