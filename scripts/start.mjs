import { join } from "node:path";
import { spawn } from "node:child_process";

const cwd = process.cwd();
const nextCli = join(cwd, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextCli, "start", "-p", "3000"], {
  cwd,
  stdio: "inherit"
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
