import dayjs from "dayjs";
import { cache } from "../../app";
import parsePopularResult from "../../functions/popular/parseSearchResults";

const getPopularMoviesService = async () => {
  const date = dayjs().format("DD/MM/YYYY");

  const popularCache = cache.get(date);

  if (popularCache) return popularCache;

  const result = await parsePopularResult();

  const payload = { success: true, body: result };

  cache.set(date, payload);

  return payload;
};

export default getPopularMoviesService;
