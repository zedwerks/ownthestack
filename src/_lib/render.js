function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function statusLabel(site, status) {
  return site.status_labels[status] || status;
}

function paperRow(paper, { linkable, numWidth } = { linkable: true }) {
  const inner = `
    <span class="paper-num">${String(paper.order).padStart(2, "0")}</span>
    <span>
      <div class="paper-title">${escapeHtml(paper.en.title)}</div>
      <p class="paper-abstract">${escapeHtml(paper.en.abstract)}</p>
    </span>
    <span class="status-pill ${paper.status}">${escapeHtml(paper.status)}</span>
  `;
  if (linkable) {
    return `<a href="/paper/${paper.id}/" class="paper-row">${inner}</a>`;
  }
  return `<div class="paper-row paper-row-disabled">${inner}</div>`;
}

// Renders the auto-generated footer blocks appended after a paper's markdown
// body (see paper.11ty.js): the tag row and the "continue reading" list.
function renderBlock(block, context) {
  switch (block.type) {
    case "tag_row":
      return `<div class="paper-tags">${block.tags
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join("")}</div>`;
    case "related": {
      const { papers } = context;
      const items = block.ids
        .map((id) => papers.find((p) => p.id === id))
        .filter(Boolean);
      if (!items.length) return "";
      return `
        <div class="related">
          <h3>Continue reading</h3>
          ${items
          .map(
            (p) => `
            <a href="/paper/${p.id}/" class="paper-row related-row">
              <span class="paper-num">${String(p.order).padStart(2, "0")}</span>
              <span class="paper-title">${escapeHtml(p.en.title)}</span>
            </a>`
          )
          .join("")}
        </div>`;
    }
    default:
      return "";
  }
}

function renderBlocks(blocks, context) {
  return blocks.map((b) => renderBlock(b, context)).join("\n");
}

// Captured once when this module is first loaded, i.e. when the site is
// built — every page rendered in this build shares one timestamp, used for
// og/article:* meta and the JSON-LD dateModified/datePublished fallback.
const BUILD_TIME = new Date().toISOString();

// Escapes a value for safe embedding inside a <script type="application/ld+json">
// block: JSON.stringify already handles quotes, but "</script>" inside a
// string value would still close the tag early in an HTML parser.
function renderJsonLd(data) {
  if (!data) return "";
  const items = Array.isArray(data) ? data : [data];
  return items
    .map(
      (item) =>
        `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`
    )
    .join("\n  ");
}

// Full page shell shared by every page.
function layout({
  site,
  title,
  description,
  activeNav,
  bodyHtml,
  canonical,
  type = "website",
  image = "/assets/og-image.png",
  datePublished,
  dateModified,
  jsonLd,
}) {
  const absoluteImage = image.startsWith("http") ? image : `https://${site.domain}${image}`;
  const isArticle = type === "article";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  ${canonical ? `<link rel="canonical" href="${canonical}" />` : ""}
  <meta name="theme-color" content="#1F3A34" />

  <meta property="og:site_name" content="${escapeHtml(site.title)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="${isArticle ? "article" : "website"}" />
  <meta property="og:url" content="${canonical || ""}" />
  <meta property="og:image" content="${absoluteImage}" />
  <meta property="og:locale" content="en_CA" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${absoluteImage}" />
  ${
    isArticle
      ? `<meta property="article:published_time" content="${datePublished || BUILD_TIME}" />
  <meta property="article:modified_time" content="${dateModified || BUILD_TIME}" />
  <meta property="article:author" content="Brad Head" />`
      : ""
  }
  ${renderJsonLd(jsonLd)}

  <link rel="icon" href="/assets/logo-mark.svg" type="image/svg+xml" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/assets/favicon-32x32.png" type="image/png" sizes="32x32" />
  <link rel="icon" href="/assets/favicon-16x16.png" type="image/png" sizes="16x16" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a href="/" class="brand"><img src="/assets/logo-mark.svg" alt="" width="32" height="32" class="brand-mark" /> ${escapeHtml(site.title)}</a>
      <nav class="site-nav">
        <a href="/" ${activeNav === "home" ? 'class="active"' : ""}>${site.nav.home}</a>
        <a href="/about/" ${activeNav === "about" ? 'class="active"' : ""}>${site.nav.about}</a>
      </nav>
    </div>
  </header>

  ${bodyHtml}

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-status">${escapeHtml(site.footer.status)}</div>
      <p>${escapeHtml(site.footer.note)}</p>
    </div>
  </footer>
</body>
</html>
`;
}

module.exports = {
  escapeHtml,
  statusLabel,
  paperRow,
  renderBlock,
  renderBlocks,
  renderJsonLd,
  layout,
  BUILD_TIME,
};
