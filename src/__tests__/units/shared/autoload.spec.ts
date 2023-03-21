import { resolve } from "path";
import { autoload } from "../../../shared/autoload";

describe("Autoload function test", () => {
  it("should return an array of filenames", () => {
    const root = process.env.INIT_CWD!;
    const files = autoload({
      directoryPathToScan: resolve(root, "src/contexts"),
      filename: "controller.ts",
    });

    expect(Array.isArray(files)).toBeTruthy();
  });

  it("should return an array of filenames that ends with controller.ts", () => {
    const endsWith = "controller.ts";
    const root = process.env.INIT_CWD!;
    const files = autoload({
      directoryPathToScan: resolve(root, "src/contexts"),
      filename: endsWith,
    });

    files.forEach((filename) => {
      expect(new RegExp(`.*${endsWith}$`, "i").test(filename)).toBeTruthy();
    });
  });
});
