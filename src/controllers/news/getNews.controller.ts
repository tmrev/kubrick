import { Request, Response } from "express";
import getNewsService from "../../services/news/getNews.service";

const getNewsController = async (req: Request, res: Response) => {
  try {
    const { sources, sentiment } = req.headers;

    const movieResult = await getNewsService(
      req.query,
      sources as any,
      sentiment as any
    );

    res.send(movieResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getNewsController;
