import axios from "axios";
import { joBloUrls } from "../../constants";

async function fetchJoBloResults(movieTitle: string) {
  const searchUrl = `${joBloUrls.search}${movieTitle.replace(/ /g, "+")}/`;

  const response = await axios.get(searchUrl);

  return response.data;
}

export default fetchJoBloResults;
