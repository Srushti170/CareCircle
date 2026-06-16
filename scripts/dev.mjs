import { existsSync, rmSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { join } from "node:path";

const cwd = process.cwd();
const nextDir = join(cwd, ".next");
const nextCli = join(cwd, "node_modules", "next", "dist", "bin", "next");
const port = "3000";

function getPidsUsingPort(targetPort) {
  try {
    const output = execFileSync("netstat", ["-ano", "-p", "tcp"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });

    return output
      .split(/\r?\n/)
      .filter((line) => line.includes(`:${targetPort}`) && line.includes("LISTENING"))
      .map((line) => line.trim().split(/\s+/).at(-1))
      .filter((value) => value && value !== "0");
  } catch {
    return [];
  }
}

function killPortOccupants(targetPort) {
  const pids = getPidsUsingPort(targetPort);

  for (const pid of pids) {
    try {
      execFileSync("taskkill", ["/PID", pid, "/F"], {
        cwd,
        stdio: ["ignore", "ignore", "ignore"]
      });
    } catch {}
  }
}

killPortOccupants(port);

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
}

execFileSync(process.execPath, [nextCli, "build"], {
  cwd,
  stdio: "inherit"
});

const child = spawn(process.execPath, [nextCli, "start", "-p", port], {
  cwd,
  stdio: "inherit"
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
