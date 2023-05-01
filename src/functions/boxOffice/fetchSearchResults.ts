import axios from "axios";
import { boxOfficeUrl } from "../../constants";

async function fetchBoxOfficeResults(imdbId: string) {
  const searchUrl = `${boxOfficeUrl}${imdbId}`;

  const response = await axios.get(searchUrl);

  return response.data;
}

export default fetchBoxOfficeResults;
