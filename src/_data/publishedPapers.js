const fs = require("fs");
const path = require("path");

const papers = require("./papers.json");
const contentDir = path.join(__dirname, "papers-content");

module.exports = () => {
  return papers
    .filter((p) => fs.existsSync(path.join(contentDir, `${p.id}.en.json`)))
    .sort((a, b) => a.order - b.order);
};
