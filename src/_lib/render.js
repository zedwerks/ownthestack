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

// Full page shell shared by every page.
function layout({ site, title, description, activeNav, bodyHtml, canonical }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  ${canonical ? `<link rel="canonical" href="${canonical}" />` : ""}
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="website" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a href="/" class="brand"><span class="brand-mark">§</span> ${escapeHtml(site.title)}</a>
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

module.exports = { escapeHtml, statusLabel, paperRow, renderBlock, renderBlocks, layout };
