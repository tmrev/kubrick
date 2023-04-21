import axios from "axios";
import { rottenTomatoesUrls } from "../../constants";

async function fetchSearchResults(movieTitle: string) {
  const searchUrl = `${rottenTomatoesUrls.search}?search=${encodeURIComponent(
    movieTitle
  )}`;
  const response = await axios.get(searchUrl);

  return response.data;
}

export default fetchSearchResults;
