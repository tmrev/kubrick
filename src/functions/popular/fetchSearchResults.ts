import axios from "axios";
import { popularUrl } from "../../constants";

async function fetchPopularResults() {
  const searchUrl = popularUrl;

  const response = await axios.get(searchUrl);

  return response.data;
}

export default fetchPopularResults;
