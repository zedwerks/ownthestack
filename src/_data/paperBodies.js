const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "papers-content");

module.exports = () => {
  const bodies = {};
  if (!fs.existsSync(contentDir)) return bodies;

  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith(".json")) continue;
    const key = file.replace(/\.json$/, ""); // e.g. "current-state.en"
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    bodies[key] = JSON.parse(raw);
  }
  return bodies;
};
