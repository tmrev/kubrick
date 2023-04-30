import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import NodeCache from "node-cache";
import { Sema } from "async-sema";

import healthRouter from "./routes/health";
import rottenTomatoesRouter from "./routes/rottenTomatoes";
import newsRouter from "./routes/news";
import popularRouter from "./routes/popular";

const shouldCompress = (req: Request, res: Response) => {
  if (req.headers["x-no-compression"]) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};

export const cache = new NodeCache({ stdTTL: 3600 }); // Cache data for 1 hour
export const rateLimiter = new Sema(5, { capacity: 5 }); // Allow up to 5 concurrent requests

class App {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;

  private config(): void {
    this.app.use(
      compression({
        filter: shouldCompress,
        threshold: 0,
      })
    );
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === "production" ? undefined : false,
      })
    );
    this.app.use(morgan("combined"));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });
  }

  private routes(): void {
    this.app.use("/health", healthRouter);
    this.app.use("/rottenTomatoes", rottenTomatoesRouter);
    this.app.use("/news", newsRouter);
    this.app.use("/popular", popularRouter);
  }
}

export default new App().app;
