import { Router, Request, Response } from "express";
import { checkExact } from "express-validator";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import gatherNewsController from "../../controllers/news/gatherNews.controller";
import getNewsController from "../../controllers/news/getNews.controller";
import searchNewsController from "../../controllers/news/searchNews.controller";
import {
  getNewsValidation,
  advancedSearchNewsValidation,
  basicSearchNewsValidation,
  trendingNewsValidation,
  newsSourcesValidation,
} from "../../validation/news";
import trendingNewsController from "../../controllers/news/trendingNews.controller";
import getSourcesController from "../../controllers/news/getSources.controller";

const router: Router = Router();

router.get("/", getNewsValidation(), asyncMiddleware(getNewsController));

router.get(
  "/advanced/search",
  advancedSearchNewsValidation(),
  checkExact(),
  asyncMiddleware(searchNewsController)
);

router.get(
  "/basic/search",
  basicSearchNewsValidation(),
  checkExact([], { message: "Only q, limit and offset are allowed" }),
  asyncMiddleware(searchNewsController)
);

router.get(
  "/trending",
  trendingNewsValidation(),
  checkExact(),
  asyncMiddleware(trendingNewsController)
);

router.get(
  "/sources",
  newsSourcesValidation(),
  checkExact(),
  asyncMiddleware(getSourcesController)
);

router.get("/gather", asyncMiddleware(gatherNewsController));

const newsRouter: Router = router;

router.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

export default newsRouter;
