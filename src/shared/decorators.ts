import { container } from "./container";
import {
  RouteDecorator,
  ROUTE_METADATA_KEY,
  CONTAINER_METADATA_KEY,
} from "./types";

export function Route(
  path: string,
  method: RouteDecorator["method"] = "get"
): ClassDecorator {
  return function (target: any) {
    const routes: RouteDecorator[] =
      Reflect.getMetadata(ROUTE_METADATA_KEY, target) || {};

    Reflect.defineMetadata(
      ROUTE_METADATA_KEY,
      Object.assign(routes, { path, method }),
      target
    );
  };
}

export function Injectable(token: string): Function {
  return function (target: any): void {
    container._providers[token] = new target();
  };
}

export function Inject(value: string) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      get: () => container.resolve(value),
      enumerable: true,
      configurable: true,
    });
  };
}
