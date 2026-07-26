const MarkdownIt = require("markdown-it");
const container = require("markdown-it-container");

const md = new MarkdownIt({
  html: true, // authors can drop raw HTML into .md/.mdx when prose isn't enough
  linkify: true,
  typographer: true,
});

// Only the top-level paragraph flow gets "dropcap"/"paragraph" classes (and the
// CSS font-size rule keyed to them). Paragraphs nested inside a container or
// blockquote (level > 0) render plain so they inherit their parent's styling
// instead of fighting it.
md.renderer.rules.paragraph_open = (tokens, idx, options, env) => {
  if (tokens[idx].level > 0) return "<p>";
  if (!env.dropcapUsed) {
    env.dropcapUsed = true;
    return '<p class="dropcap">';
  }
  return '<p class="paragraph">';
};

md.renderer.rules.heading_open = (tokens, idx) => {
  const tag = tokens[idx].tag;
  return tag === "h2" ? '<h2 class="section-heading">' : `<${tag}>`;
};

// A plain markdown blockquote is always a pullquote in this content model.
md.renderer.rules.blockquote_open = () => '<blockquote class="pullquote">\n';

// ::: sidenote
// Text goes here, same as any paragraph.
// :::
md.use(container, "sidenote", {
  render(tokens, idx) {
    return tokens[idx].nesting === 1 ? '<div class="sidenote">' : "</div>";
  },
});

// ::: keystat 10 yrs | the length of Nova Scotia's Oracle Cerner contract
// :::
md.use(container, "keystat", {
  render(tokens, idx) {
    if (tokens[idx].nesting !== 1) return "";
    const params = tokens[idx].info.trim().slice("keystat".length).trim();
    const [value, ...labelParts] = params.split("|");
    const label = labelParts.join("|").trim();
    return `<div class="keystat"><span class="keystat-value">${md.utils.escapeHtml(
      value.trim()
    )}</span><span class="keystat-label">${md.renderInline(label)}</span></div>`;
  },
});

// Renders one paper body's markdown to HTML. `env` is fresh per call so
// dropcap tracking never leaks between papers.
function renderPaperBody(markdownSource) {
  return md.render(markdownSource, {});
}

module.exports = { md, renderPaperBody };
