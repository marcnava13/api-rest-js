import http from "http";
import supertest, { SuperTest } from "supertest";
import { Server } from "./src/shared/server";

declare global {
  var request: SuperTest<any>;
}

let server: http.Server;

beforeAll(() => {
  const app = new Server();
  server = app.listen();
  globalThis.request = supertest(app.getApplication());
});

afterAll(() => {
  server.close();
});
