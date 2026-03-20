import fs from "node:fs";
import path from "node:path";

const appDir = process.cwd();
const nextDir = path.join(appDir, ".next");
const standaloneDir = path.join(nextDir, "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");
const requiredManifest = path.join(standaloneNextDir, "server", "pages-manifest.json");

if (!fs.existsSync(nextDir)) {
  console.warn("[ensure-standalone] Skipped: .next directory not found.");
  process.exit(0);
}

if (fs.existsSync(requiredManifest)) {
  console.log("[ensure-standalone] Standalone output already exists.");
  process.exit(0);
}

console.log("[ensure-standalone] Synthesizing standalone output for OpenNext.");
fs.mkdirSync(standaloneNextDir, { recursive: true });

for (const entry of fs.readdirSync(nextDir, { withFileTypes: true })) {
  if (entry.name === "standalone") {
    continue;
  }

  const source = path.join(nextDir, entry.name);
  const destination = path.join(standaloneNextDir, entry.name);
  fs.cpSync(source, destination, { recursive: true, force: true });
}

for (const fileName of ["package.json", ".env", ".env.production"]) {
  const source = path.join(appDir, fileName);
  const destination = path.join(standaloneDir, fileName);

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
  }
}

const nodeModulesSource = path.join(appDir, "node_modules");
const nodeModulesDestination = path.join(standaloneDir, "node_modules");

if (fs.existsSync(nodeModulesSource) && !fs.existsSync(nodeModulesDestination)) {
  try {
    fs.symlinkSync(
      nodeModulesSource,
      nodeModulesDestination,
      process.platform === "win32" ? "junction" : "dir"
    );
  } catch (error) {
    console.warn("[ensure-standalone] Failed to link node_modules:", error);
  }
}

console.log("[ensure-standalone] Standalone output ready.");
