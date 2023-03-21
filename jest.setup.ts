import http from "http";
import supertest, { SuperTest } from "supertest";
import { Server } from "./src/shared/server";

declare global {
  var request: SuperTest<any>;
}

let server: http.Server;

const TEST_TYPE = {
  E2E: "e2e",
  UNITS: "units",
};

beforeAll(() => {
  if (process.env.TEST_TYPE === TEST_TYPE.E2E) {
    const app = new Server();
    server = app.listen();
    globalThis.request = supertest(app.getApplication());
  }
});

afterAll(() => {
  if (process.env.TEST_TYPE === TEST_TYPE.E2E) {
    server.close();
  }
});
