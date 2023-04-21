import { cache, rateLimiter } from "../../app";
import fetchMoviePage from "../../functions/rottenTomatoes/fetchMoviePage";

const movieScoreService = async (movieTitle: string) => {
  const cachedMovie = cache.get(movieTitle);

  if (cachedMovie) return cachedMovie;

  await rateLimiter.acquire();
  const result = await fetchMoviePage(movieTitle);
  rateLimiter.release();

  cache.set(movieTitle, { success: true, body: result });

  return {
    success: true,
    body: result,
  };
};

export default movieScoreService;
