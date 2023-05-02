import { Request, Response } from "express";
import getNewsService from "../../services/news/getNews.service";

const getNewsController = async (req: Request, res: Response) => {
  try {
    const movieResult = await getNewsService(req.query);

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getNewsController;
