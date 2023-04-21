import fetchMoviePage from "../../functions/rottenTomatoes/fetchMoviePage";

const movieScoreService = async (movieTitle: string) => {
  const result = await fetchMoviePage(movieTitle);

  return {
    success: true,
    body: result,
  };
};

export default movieScoreService;
