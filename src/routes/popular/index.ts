import { Router, Request, Response } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import getPopularMoviesController from "../../controllers/popular/getPopularMovies.controller";

const router: Router = Router();

router.get("/movies", asyncMiddleware(getPopularMoviesController));

const popularRouter: Router = router;

router.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

export default popularRouter;
