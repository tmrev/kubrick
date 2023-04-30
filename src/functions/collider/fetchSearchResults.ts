import axios from "axios";
import { colliderUrls } from "../../constants";

async function fetchColliderResults(movieTitle: string) {
  const searchUrl = `${colliderUrls.search}?q=${movieTitle.replace(/ /g, "+")}`;

  const response = await axios.get(searchUrl);

  return response.data;
}

export default fetchColliderResults;
