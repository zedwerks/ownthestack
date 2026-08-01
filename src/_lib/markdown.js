const MarkdownIt = require("markdown-it");
const container = require("markdown-it-container");

const md = new MarkdownIt({
  html: true, // authors can drop raw HTML into .md/.mdx when prose isn't enough
  linkify: true,
  typographer: true,
});

// Link a claim to a standalone evidence note with a compact superscript:
//
//   The systems remain fragmented.[^1](/evidence/provincial-procurement/)
//
// This deliberately differs from Markdown's same-page footnote convention:
// the URL makes the destination explicit and keeps every evidence note a real,
// shareable page. An optional quoted title becomes part of the accessible label.
md.inline.ruler.before("link", "evidence_reference", (state, silent) => {
  const source = state.src.slice(state.pos);
  const match = source.match(
    /^\[\^([^\]\n]+)\]\(([^)\s]+)(?:\s+["']([^"'\n]+)["'])?\)/
  );
  if (!match) return false;

  const href = state.md.normalizeLink(match[2]);
  if (!state.md.validateLink(href)) return false;

  if (!silent) {
    const token = state.push("evidence_reference", "", 0);
    token.meta = { label: match[1], href, title: match[3] || "" };
  }
  state.pos += match[0].length;
  return true;
});

md.renderer.rules.evidence_reference = (tokens, idx) => {
  const { label, href, title } = tokens[idx].meta;
  const escapedLabel = md.utils.escapeHtml(label);
  const accessibleLabel = md.utils.escapeHtml(
    title ? `Evidence ${label}: ${title}` : `Evidence ${label}`
  );
  return `<sup class="evidence-ref"><a href="${md.utils.escapeHtml(
    href
  )}" aria-label="${accessibleLabel}">${escapedLabel}</a></sup>`;
};

// Only the top-level paragraph flow gets "dropcap"/"paragraph" classes (and the
// CSS font-size rule keyed to them). Paragraphs nested inside a container or
// blockquote (level > 0) render plain so they inherit their parent's styling
// instead of fighting it.
md.renderer.rules.paragraph_open = (tokens, idx, options, env) => {
  // markdown-it hides paragraph wrappers inside tight lists. Preserve that
  // behaviour instead of emitting an unmatched opening <p> tag.
  if (tokens[idx].hidden) return "";
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
