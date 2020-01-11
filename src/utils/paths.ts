import fs from "fs";
import os from "os";
import path from "path";

const rootDir = path.resolve(__dirname, "..");
export const distPath = path.resolve(rootDir, "dist");

export const notificationDBPath = fs.realpathSync(
  `${os.tmpdir()}/../0/com.apple.notificationcenter/db2/db`
);
