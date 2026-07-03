import { existsSync, rmSync, readFileSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { join } from "node:path";
import { MongoClient } from "mongodb";

const cwd = process.cwd();

// Test MongoDB connection on startup
const envPath = join(cwd, ".env.local");
let uri = process.env.MONGODB_URI;

if (!uri && existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf8");
  const match = envContent.match(/MONGODB_URI\s*=\s*(.*)/);
  if (match && match[1].trim()) {
    uri = match[1].trim();
  }
}

if (uri) {
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    await client.db().admin().ping();
    console.log("mongo connected");
    await client.close();
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
  }
} else {
  console.warn("MONGODB_URI not found. Running without database connection.");
}

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
