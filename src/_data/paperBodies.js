const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { renderPaperBody } = require("../_lib/markdown.js");

const contentDir = path.join(__dirname, "papers-content");

module.exports = () => {
  const bodies = {};
  if (!fs.existsSync(contentDir)) return bodies;

  for (const file of fs.readdirSync(contentDir)) {
    if (!/\.mdx?$/.test(file)) continue;
    const key = file.replace(/\.mdx?$/, ""); // e.g. "current-state.en"
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data, content } = matter(raw);

    bodies[key] = {
      id: data.id,
      locale: data.locale,
      translation_status: data.translation_status,
      tags: data.tags || [],
      related: data.related || [],
      html: renderPaperBody(content),
    };
  }
  return bodies;
};
