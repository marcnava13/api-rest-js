import type { Boom } from "@hapi/boom";
import type { NextFunction, Request, Response } from "express";

export declare type ApiRequest = Request;
export declare type ApiResponse = Response;
export declare type Middleware = NextFunction;
export declare type ErrorHttpException = Boom;
export interface HttpController {
  handle(req: ApiRequest, res: ApiResponse): Promise<void>;
}
export declare type RouteDecorator = {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
};

export const ROUTE_METADATA_KEY = Symbol("routes");
export const CONTAINER_METADATA_KEY = Symbol("container");
