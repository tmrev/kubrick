import { Router, Request, Response } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import healthController from "../../controllers/health/heath.controller";

const router: Router = Router();

router.get("/", asyncMiddleware(healthController));

const healthRouter: Router = router;

router.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

export default healthRouter;
