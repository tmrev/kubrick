import { Router, Request, Response } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import gatherNewsController from "../../controllers/news/gatherNews.controller";
import getNewsController from "../../controllers/news/getNews.controller";
import searchNewsController from "../../controllers/news/searchNews.controller";
import { getNewsValidation, searchNewsValidation } from "../../validation/news";
import trendingNewsController from "../../controllers/news/trendingNews.controller";

const router: Router = Router();

router.get("/", getNewsValidation(), asyncMiddleware(getNewsController));

router.get(
  "/search",
  searchNewsValidation(),
  asyncMiddleware(searchNewsController)
);

router.get("/trending", asyncMiddleware(trendingNewsController));

router.get("/gather", asyncMiddleware(gatherNewsController));

const newsRouter: Router = router;

router.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

export default newsRouter;
