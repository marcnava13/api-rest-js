import { methodNotAllowed } from "@hapi/boom";
import { readdirSync } from "fs";
import http from "http";
import { resolve } from "path";
import express, { type Application, Router as ExpressRouter } from "express";

import "reflect-metadata";
import {
  ApiRequest,
  ApiResponse,
  CONTAINER_METADATA_KEY,
  ErrorHttpException,
  Middleware,
  RouteDecorator,
  ROUTE_METADATA_KEY,
} from "./types";
import { autoload } from "./autoload";

export class Server {
  private readonly app: Application;
  private readonly router: ExpressRouter;

  constructor() {
    this.app = express();
    this.router = ExpressRouter();

    this.initConfig();
    this.registerRoutes();
    this.registerHandlerError();
  }

  public listen(port: number = 3000): http.Server {
    const server = this.app.listen(port, () => {
      if (process.env.NODE_ENV !== "test") {
        console.log(`Server started on port ${port}`);
      }
    });

    return server;
  }

  public getApplication(): Application {
    return this.app;
  }

  private initConfig(): void {
    this.app.use(express.json({ limit: "5mb" }));
  }

  private registerHandlerError(): void {
    this.app.use(
      "*",
      (
        err: ErrorHttpException,
        req: ApiRequest,
        res: ApiResponse,
        _: Middleware
      ) => {
        const { output } = err;
        res.status(output.statusCode);
        res.json({ ...output.payload, ...err.data });
        res.end();
      }
    );
  }

  private async registerRoutes(): Promise<void> {
    const controllerFiles = autoload({
      directoryPathToScan: resolve(__dirname, "..", "contexts/"),
      filename: "controller.ts",
    });

    for (const file of controllerFiles) {
      const target = require(resolve(file)).default;
      const routing: RouteDecorator = Reflect.getMetadata(
        ROUTE_METADATA_KEY,
        target
      );

      const controller = new target();
      this.router[routing.method](routing.path, async (req, res, next) => {
        await controller.handle(req, res, next);
        res.end();
      });
    }
    this.app.use(this.router);

    // Rest of endpoints
    this.app.use("*", () => {
      throw methodNotAllowed();
    });
  }
}
