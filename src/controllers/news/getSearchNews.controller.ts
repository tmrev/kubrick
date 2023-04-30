import { Request, Response } from "express";
import getSearchNewsService from "../../services/news/getSearchNews.service";

const getSearchNewsController = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    const movieResult = await getSearchNewsService(String(q));

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getSearchNewsController;
