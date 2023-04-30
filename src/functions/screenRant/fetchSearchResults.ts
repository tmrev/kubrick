import axios from "axios";
import { screenRantUrls } from "../../constants";

async function fetchScreenRantResults(movieTitle: string) {
  const searchUrl = `${screenRantUrls.search}?q=${movieTitle.replace(
    / /g,
    "+"
  )}`;

  const response = await axios.get(searchUrl);

  return response.data;
}

export default fetchScreenRantResults;
