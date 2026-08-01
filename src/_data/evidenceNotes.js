const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { renderPaperBody } = require("../_lib/markdown.js");

const contentDir = path.join(__dirname, "evidence");

module.exports = () => {
  if (!fs.existsSync(contentDir)) return [];

  const notes = fs
    .readdirSync(contentDir)
    .filter((file) => !file.startsWith("_") && /\.mdx?$/.test(file))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      // Empty files are useful placeholders while evidence is being gathered;
      // leave them unpublished until they contain front matter and prose.
      if (!raw.trim()) return null;
      const { data, content } = matter(raw);
      const filenameSlug = file.replace(/\.mdx?$/, "");
      const slug = data.slug || filenameSlug;

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(
          `Evidence file ${file} has invalid slug "${slug}"; use lowercase words separated by hyphens`
        );
      }
      if (!data.title) {
        throw new Error(`Evidence file ${file} is missing a title`);
      }

      return {
        ...data,
        slug,
        sourceFile: file,
        html: renderPaperBody(content),
      };
    })
    .filter(Boolean);

  const seen = new Set();
  for (const note of notes) {
    if (seen.has(note.slug)) {
      throw new Error(`Duplicate evidence slug "${note.slug}"`);
    }
    seen.add(note.slug);
  }

  return notes.sort((a, b) => a.slug.localeCompare(b.slug));
};
