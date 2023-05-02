import { Request, Response } from "express";
import gatherNewsService from "../../services/news/gatherNews.service";

const gatherNewsController = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    const movieResult = await gatherNewsService(String(q));

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default gatherNewsController;
