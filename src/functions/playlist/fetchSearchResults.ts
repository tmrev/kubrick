import axios from "axios";
import { thePlayListUrls } from "../../constants";

async function fetchPlaylistResults(movieTitle: string) {
  const searchUrl = `${thePlayListUrls.search}?s=${movieTitle.replace(
    / /g,
    "+"
  )}`;

  const response = await axios.get(searchUrl);

  return response.data;
}

export default fetchPlaylistResults;
