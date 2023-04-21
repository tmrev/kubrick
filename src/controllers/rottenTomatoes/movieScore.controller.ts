import { Request, Response } from "express";
import movieScoreService from "../../services/rottenTomatoes/movieScore.service";

const movieScoreController = async (req: Request, res: Response) => {
  try {
    const { movieTitle } = req.query;

    const movieResult = await movieScoreService(String(movieTitle));

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default movieScoreController;
