import { Request, Response } from "express";

import searchNewsService from "../../services/news/searchNews.service";

const searchNewsController = async (req: Request, res: Response) => {
  try {
    const movieResult = await searchNewsService(req.query as any);

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default searchNewsController;
