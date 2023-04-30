import { Request, Response } from "express";
import getNewsService from "../../services/news/getNews.service";

const getNewsController = async (req: Request, res: Response) => {
  try {
    const { movieTitle } = req.query;

    const movieResult = await getNewsService(String(movieTitle));

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getNewsController;
