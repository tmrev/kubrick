import { Request, Response } from "express";
import trendingNewsService from "../../services/news/trendingNews.service";

const trendingNewsController = async (req: Request, res: Response) => {
  try {
    const movieResult = await trendingNewsService();

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default trendingNewsController;
