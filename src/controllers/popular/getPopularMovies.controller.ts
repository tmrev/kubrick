import { Request, Response } from "express";
import getPopularMoviesService from "../../services/popular/getPopularMovies.service";

const getPopularMoviesController = async (req: Request, res: Response) => {
  try {
    const movieResult = await getPopularMoviesService();

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getPopularMoviesController;
