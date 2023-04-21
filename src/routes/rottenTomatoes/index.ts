import { Router, Request, Response } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import movieScoreController from "../../controllers/rottenTomatoes/movieScore.controller";

const router: Router = Router();

router.get("/", asyncMiddleware(movieScoreController));

const rottenTomatoesRouter: Router = router;

router.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

export default rottenTomatoesRouter;
