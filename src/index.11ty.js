const { layout, paperRow, escapeHtml } = require("./_lib/render.js");

class HomePage {
  data() {
    return {
      permalink: "/index.html",
    };
  }

  render(data) {
    const { site, papers, publishedPapers } = data;
    const title = `${site.title} — ${site.subtitle}`;
    const description = site.hero.sub;

    // Point "see the governance model" at the real paper once it's published;
    // until then, fall back to the on-page index instead of a dead link.
    const governance = publishedPapers.find((p) => p.id === "governance");
    const secondaryHref = governance ? `/paper/governance/` : `/#papers`;

    const bodyHtml = `
      <section class="hero">
        <div class="wrap">
          <div class="eyebrow">${escapeHtml(site.hero.eyebrow)}</div>
          <h1 class="headline">${escapeHtml(site.hero.headline)}</h1>
          <p class="sub">${escapeHtml(site.hero.sub)}</p>
          <div class="cta-row">
            <a href="/paper/current-state/" class="btn primary">${escapeHtml(
              site.hero.cta_primary
            )}</a>
            <a href="${secondaryHref}" class="btn">${escapeHtml(site.hero.cta_secondary)}</a>
          </div>
        </div>
      </section>
      <section class="paper-index" id="papers">
        <div class="wrap">
          ${papers
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((p) => paperRow(p, { linkable: p.status === "published" }))
            .join("\n")}
        </div>
      </section>
    `;

    return layout({
      site,
      title,
      description,
      activeNav: "home",
      canonical: `https://${site.domain}/`,
      bodyHtml,
    });
  }
}

module.exports = HomePage;
