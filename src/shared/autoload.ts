import { readdirSync, statSync } from "fs";

export function autoload({
  directoryPathToScan,
  filename = "index.ts",
  routingFiles = [],
}: {
  directoryPathToScan: string;
  filename?: string;
  routingFiles?: string[];
}): string[] {
  const files = readdirSync(directoryPathToScan);
  for (const i in files) {
    const path = `${directoryPathToScan}/${files[i]}`;
    if (statSync(path).isDirectory()) {
      autoload({ directoryPathToScan: path, filename, routingFiles });
    } else if (new RegExp(`.*${filename}$`, "i").test(path)) {
      routingFiles.push(path);
    }
  }
  return routingFiles;
}
