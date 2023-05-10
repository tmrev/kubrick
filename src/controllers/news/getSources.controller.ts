import { Request, Response } from "express";
import getSourcesService from "../../services/news/getSources.service";

const getSourcesController = async (req: Request, res: Response) => {
  try {
    const { sources } = req.headers;

    const sourceResult = await getSourcesService(sources as any);

    res.send(sourceResult);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getSourcesController;
