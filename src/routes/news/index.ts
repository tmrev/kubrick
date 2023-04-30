import { Router, Request, Response } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import getNewsController from "../../controllers/news/getNews.controller";

const router: Router = Router();

router.get("/", asyncMiddleware(getNewsController));

const newsRouter: Router = router;

router.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

export default newsRouter;
