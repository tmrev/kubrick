import { Router, Request, Response } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import getSearchNewsController from "../../controllers/news/getSearchNews.controller";

const router: Router = Router();

router.get("/search", asyncMiddleware(getSearchNewsController));

const newsRouter: Router = router;

router.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

export default newsRouter;
